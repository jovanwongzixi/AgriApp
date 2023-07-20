'use client'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartData,
} from 'chart.js'
import { capitalise } from '@/app/helper/functions'
import { Line } from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Agribox Data Line Chart',
        },
    },
}

export default function LineChart({ labels, values, variable } : { labels : any[], values: any[], variable: string}){
    console.log(labels)
    console.log(values)
    // console.log(`result query length: ${resLength}`)
    const indivReading = values.map(val => val[variable])
    const data = {
        labels,
        datasets: [
            {
                label: capitalise(variable),
                data: indivReading,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ]
    }
    return <Line options={options} data={data}></Line>
}