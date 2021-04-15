import { toCoords, line, computeBounderies, css } from './utils'


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

    css(canvas, {
        width: WIDTH + 'px',
        height: HEIGHT + 'px',
    })

    const $left = root.querySelector('[data-type="left"]')
    const $zoom_window = root.querySelector('[data-type="window"]')
    const $right = root.querySelector('[data-type="right"]')

    root.addEventListener("mousedown", mousedown)

    function mousedown(event) {
        
    }


    const defaultWidth = WIDTH * 0.3

    setPosition(0, defaultWidth)


    function setPosition(left, right) {
        const w = WIDTH - right - left

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

        
    }

    canvas.width = DPI_WIDTH
    canvas.height = DPI_HEIGHT


    const [yMin, yMax] = computeBounderies(data)
    const xRatio = VIEW_WIDTH / (data.columns[0].length - 2)
    const yRatio = VIEW_HEIGHT / (yMax - yMin)

    xData = data.columns.filter((col) => data.types[col[0]] !== 'line')[0]
    yData = data.columns.filter((col) => data.types[col[0]] === 'line')

    // Painting
    // yAxis(yMin, yMax)
    // xAxis(xData, yData, xRatio)

    yData.map(toCoords(xRatio, yRatio, DPI_HEIGHT, -5)).forEach((coords, indx) => {
        const name = yData[indx][0];
        const color = data.colors[name]
        line(ctx, coords, { color })
    })


    


}