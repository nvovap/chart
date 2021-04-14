import './styles.scss'
import { getChartData } from './data'
import { chart } from './chart'


const toChart = chart(document.getElementById("chart"), getChartData());

toChart.init()



