import { toCoords, line, circle, toDate, isOver, computeBounderies, css, computeXRatio, computeYRatio } from './utils'
import { tooltip } from './tooltip'
import { sliderChart } from './slider'

const PADDING = 40

const WIDTH = 600
const HEIGHT = 200
const DPI_WIDTH = WIDTH * 2
const DPI_HEIGHT = HEIGHT * 2
const VIEW_HEIGHT = DPI_HEIGHT - PADDING * 2
const VIEW_WIDTH = DPI_WIDTH


const ROWS_COUNT = 5

const SPEED = 3000




export function chart(root, data) {

  let raf
  // let prevMax
  const canvas = root.querySelector('[data-el="main"]')
  const tip = tooltip(root.querySelector('[data-el="tooltip"]'))
  const ctx = canvas.getContext("2d")

  canvas.style.width = WIDTH + 'px'
  canvas.style.height = HEIGHT + 'px'

  css(canvas, {
    width: WIDTH + 'px',
    height: HEIGHT + 'px',
  })

  canvas.width = DPI_WIDTH
  canvas.height = DPI_HEIGHT

  canvas.addEventListener("mousemove", mousemove)
  canvas.addEventListener("mouseleave", mouseleave)

  function mouseleave() {
    proxy.mouse = null
    tip.hide()
  }

  function mousemove({ clientX, clientY }) {
    const { left, top } = canvas.getBoundingClientRect()
    proxy.mouse = {
      x: (clientX - left) * 2,
      tooltip: {
        left: clientX - left,
        top: clientY - top,
      },
    }
  }



  const slider = sliderChart(root.querySelector('[data-el="slider"]'), data, DPI_WIDTH)


  const proxy = new Proxy({}, {
    set(...args) {
      const result = Reflect.set(...args)
      raf = requestAnimationFrame(paint)
      return result;
    }
  })

  slider.subscribe(pos => {
    proxy.pos = pos
  })
  
  function clear() {
    ctx.clearRect(0, 0, DPI_WIDTH, DPI_HEIGHT)
  }

/*
  function getMax(yMax) {
    const step = Math.round((yMax - prevMax) / SPEED)

    if (proxy.max < yMax) {
      proxy.max += step
    } else if (proxy.max > yMax) {
      proxy.max = yMax
      prevMax = yMax
    }

    return proxy.max
  }
  */


  function translateX(length, xRatio, left) {
    return -1 * Math.round((left * length * xRatio) / 100)
  }

  function paint() {
    clear()

    const length = data.columns[0].length
    const leftIndex  = Math.round(length * proxy.pos[0] / 100)
    const rightIndex = Math.round(length * proxy.pos[1] / 100)

    const columns = data.columns.map(el => {
      res = el.slice(leftIndex, rightIndex)

      if (typeof res[0] !== 'string') {
        res.unshift(el[0])
      }

      return res
    })

    const [yMin, yMax] = computeBounderies({columns, types: data.types})


    // if (!prevMax) {
    //  prevMax = yMax
    //  proxy.max = yMax
    // }

    // const max = getMax(yMax)

    const xRatio = computeXRatio(VIEW_WIDTH, columns[0].length)
    const yRatio = computeYRatio(VIEW_HEIGHT, yMax, yMin)

    // const translate = translateX(data.columns[0].length, xRatio, proxy.pos[0])

    const xData = columns.filter((col) => data.types[col[0]] !== 'line')[0]
    const yData = columns.filter((col) => data.types[col[0]] === 'line')

    
    yAxis(yMin, yMax) 
    xAxis(xData, yData, xRatio)

    yData.map(toCoords(xRatio, yRatio, DPI_HEIGHT, yMin, PADDING)).forEach((coords, indx) => {
      const name = yData[indx][0];
      const color = data.colors[name]
      line(ctx, coords, { color })

      for (const [x, y] of coords) {
        if (isOver(proxy.mouse, x, coords.length, DPI_WIDTH)) {
          circle(ctx, [x, y], color)
          break
        }
      }
    })
  }

  

  function xAxis(xData, yData, xRatio) {
    const colsCount = 10
    const step = Math.round(xData.length / colsCount)

    ctx.beginPath()
    ctx.font = 'normal 20px Helvetica, sans-serif'
    ctx.fillStyle = '#96a2aa'

    for (let i = 1; i < xData.length; i++) {

      const pos_x = xRatio * i
      if ((i - 1) % step == 0) {
        const xText = toDate(xData[i])
        ctx.fillText(xText, pos_x, DPI_HEIGHT - 10)
      }

      if (isOver(proxy.mouse, pos_x, xData.length, DPI_WIDTH)) {
        ctx.save()
        // ctx.strokeStyle = '#96a2aa'
        ctx.moveTo(pos_x, PADDING)
        ctx.lineTo(pos_x, DPI_HEIGHT - PADDING)
        ctx.restore()


        tip.show(proxy.mouse.tooltip, {
          title: toDate(xData[i]),
          items: yData.map(col => { return {
            color : data.colors[col[0]],
            name:  data.names[col[0]],
            value: col[i+1],
          }}),
                   
        })
      }
    }
    ctx.stroke()
    ctx.closePath()
  }

  function yAxis(yMin, yMax) {

    const step = VIEW_HEIGHT / ROWS_COUNT

    const stepText = Math.round((yMax - yMin) / ROWS_COUNT)

    ctx.beginPath()
    ctx.lineWidth = 1
    ctx.strokeStyle = '#bbb'
    ctx.font = 'normal 20px Helvetica, sans-serif'
    ctx.fillStyle = '#96a2aa'
    for (let i = 1; i <= ROWS_COUNT; i++) {
      const y = step * i
      const yText = yMax - stepText * i
      const pos_y = y + PADDING
      ctx.fillText(yText, 0, pos_y - 10)
      ctx.moveTo(0, pos_y)
      ctx.lineTo(DPI_WIDTH, pos_y)

    }
    ctx.stroke()
    ctx.closePath()

  }


  return {
    init() {
      paint()
    },
    destroy() {
      cancelAnimationFrame(raf)
      canvas.removeEventListener("mousemove", mousemove)
      canvas.removeEventListener("mouseleave", mouseleave)
    }
  }

}