import { line, circle, toDate, isOver, computeBounderies, css } from './utils'
import { tooltip } from './tooltip'

const PADDING = 40

const WIDTH = 600
const HEIGHT = 200
const DPI_WIDTH = WIDTH * 2
const DPI_HEIGHT = HEIGHT * 2
const VIEW_HEIGHT = DPI_HEIGHT - PADDING * 2
const VIEW_WIDTH = DPI_WIDTH


const ROWS_COUNT = 5


export function chart(root, data) {

  let raf
  const canvas = root.querySelector('canvas')
  const tip = tooltip(root.querySelector('[data-el="tooltip"]'))
  const ctx = canvas.getContext("2d");

  canvas.style.width  = WIDTH  + 'px'
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
  }


  const proxy = new Proxy({}, {
    set(...args) {
      const result = Reflect.set(...args)
      raf = requestAnimationFrame(paint)
      return result;
    }
  })

  function mousemove({ clientX, clientY }) {
    const { left, top } = canvas.getBoundingClientRect()
    proxy.mouse = {
      x: (clientX - left) * 2,
      tooltip: {
          left: clientX - left,
          top:  clientY - top,
      },
    }
  }

  function clear() {
    ctx.clearRect(0, 0, DPI_WIDTH, DPI_HEIGHT)
  }

  function paint() {
    clear()

    const [yMin, yMax] = computeBounderies(data)
    const xRatio = VIEW_WIDTH / (data.columns[0].length - 2)
    const yRatio = VIEW_HEIGHT / (yMax - yMin)

    xData = data.columns.filter((col) => data.types[col[0]] !== 'line')[0]
    yData = data.columns.filter((col) => data.types[col[0]] === 'line')

    // Painting
    yAxis(yMin, yMax)
    xAxis(xData, xRatio)

    yData.map(toCoords(xRatio, yRatio)).forEach((coords, indx) => {
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

  function toCoords(xRatio, yRatio) {
    return (col) => col.filter((_, i) => i !== 0).map((y, i) => [
      Math.floor(i * xRatio),
      Math.floor(DPI_HEIGHT - PADDING - y * yRatio)
    ])
  }

  function xAxis(data, xRatio) {
    const colsCount = 10
    const step = Math.round(data.length / colsCount)

    ctx.beginPath()
    ctx.font = 'normal 20px Helvetica, sans-serif'
    ctx.fillStyle = '#96a2aa'

    for (let i = 1; i < data.length; i++) {

      const pos_x = xRatio * i
      if ((i - 1) % step == 0) {
        const xText = toDate(data[i])
        ctx.fillText(xText, pos_x, DPI_HEIGHT - 10)
      }

      if (isOver(proxy.mouse, pos_x, data.length, DPI_WIDTH)) {
        console.log(`over x = ${pos_x}`)
        ctx.save()
        // ctx.strokeStyle = '#96a2aa'
        ctx.moveTo(pos_x, PADDING)
        ctx.lineTo(pos_x, DPI_HEIGHT - PADDING)
        ctx.restore()


        tip.show(proxy.mouse.tooltip, {
            title: toDate(data[i]),
            items: []
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