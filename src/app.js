import './styles.scss'
import { getChartData } from './data'
import { chart } from './chart'

import data  from './chart_data.json'


const toChart = chart(document.getElementById("chart"), data[4]);

toChart.init()



