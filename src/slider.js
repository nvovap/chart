import { toCoords, line, computeBounderies, css, computeXRatio, computeYRatio } from './utils'

function noop() {}

const HEIGHT = 40
const DPI_HEIGHT = HEIGHT * 2

export function sliderChart(root, data, DPI_WIDTH) {

    const WIDTH = DPI_WIDTH / 2
    const VIEW_WIDTH = DPI_WIDTH
    const VIEW_HEIGHT = DPI_HEIGHT

    const MIN_WIDTH = WIDTH * 0.05

    const canvas = root.querySelector('canvas')
    const ctx = canvas.getContext("2d")

    canvas.style.width = WIDTH + 'px'
    canvas.style.height = HEIGHT + 'px'

    let nextfn = noop

    css(canvas, {
        width: WIDTH + 'px',
        height: HEIGHT + 'px',
    })

    const $left = root.querySelector('[data-el="left"]')
    const $zoom_window = root.querySelector('[data-el="window"]')
    const $right = root.querySelector('[data-el="right"]')

    root.addEventListener('mousedown', mousedown)
    document.addEventListener('mouseup', mouseup)


    function next() {
        nextfn(getPosition())
    }

    function mouseup() {
        document.onmousemove = null
    }

    function mousedown(event) {
        const type = event.target.dataset.type
        const dimensions = {
            left: parseInt($zoom_window.style.left),
            right: parseInt($zoom_window.style.right),
            width: parseInt($zoom_window.style.width),

        }

        if (type === 'window') {
            const startX = event.pageX
            document.onmousemove = ( e ) => {
                const delta = startX - e.pageX
                if (delta == 0) return

                const left  =  dimensions.left - delta
                const right =  WIDTH - left -dimensions.width

                setPosition(left, right)
            }
        } else if (type === 'right' || type === 'left') { 

            const startX = event.pageX
            document.onmousemove = ( e ) => {
                const delta = startX - e.pageX
                if (delta == 0) return

                if (type === 'left') {
                    const left = WIDTH - dimensions.width - delta - dimensions.right
                    setPosition(left, dimensions.right)
                }

                if (type === 'right') {
                    const right = WIDTH - dimensions.width + delta - dimensions.left
                    setPosition(dimensions.left, right)
                }
            }

        }

    }


    const defaultWidth = WIDTH * 0.3

    setPosition(0, WIDTH - defaultWidth)


    function setPosition(left, right) {
        const w = WIDTH - right - left
        next()

        if (w < MIN_WIDTH ) {
            css($zoom_window, {width: MIN_WIDTH + 'px'})
            return
        }

        if (left < 0) {
            css($zoom_window, { left:'0px' })
            css($left, { width:'0px' })
            return
        }

        if (right < 0) {
            css($zoom_window, { right:'0px' })
            css($right, { width:'0px' })
            return
        }

        css($zoom_window, {
            width: w + 'px',
            left: left + 'px',
            right: right + 'px',
        })

        css($right, { width: right + 'px' })
        css($left,  { width: left + 'px' })
    }

    function getPosition() {
        const left  = parseInt($left.style.width)
        const right = WIDTH - parseInt($right.style.width)

        return [ left * 100 / WIDTH, right * 100 / WIDTH]
    }

    canvas.width = DPI_WIDTH
    canvas.height = DPI_HEIGHT


    const [yMin, yMax] = computeBounderies(data)
    const xRatio = computeXRatio(VIEW_WIDTH, data.columns[0].length)
    const yRatio = computeYRatio(VIEW_HEIGHT, yMax, yMin)

    xData = data.columns.filter((col) => data.types[col[0]] !== 'line')[0]
    yData = data.columns.filter((col) => data.types[col[0]] === 'line')

    // Painting
    // yAxis(yMin, yMax)
    // xAxis(xData, yData, xRatio)

    yData.map(toCoords(xRatio, yRatio, DPI_HEIGHT, yMin, -5)).forEach((coords, indx) => {
        const name = yData[indx][0];
        const color = data.colors[name]
        line(ctx, coords, { color })
    })


    return {
        subscribe(fn) {
            nextfn = fn
            fn(getPosition())
        }
    }

}