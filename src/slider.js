import { toCoords, line, computeBounderies, css } from './utils'


const HEIGHT = 40
const DPI_HEIGHT = HEIGHT * 2

export function sliderChart(root, data, DPI_WIDTH) {

    const WIDTH = DPI_WIDTH / 2
    const VIEW_WIDTH = DPI_WIDTH
    const VIEW_HEIGHT = DPI_HEIGHT

    const canvas = root.querySelector('canvas')
    const ctx = canvas.getContext("2d")

    canvas.style.width = WIDTH + 'px'
    canvas.style.height = HEIGHT + 'px'

    css(canvas, {
        width: WIDTH + 'px',
        height: HEIGHT + 'px',
    })

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