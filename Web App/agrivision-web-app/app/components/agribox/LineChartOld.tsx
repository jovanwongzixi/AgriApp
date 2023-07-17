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
} from 'chart.js'
import { DocumentData, Unsubscribe } from 'firebase/firestore'
import { useEffect, useState } from 'react'
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
            text: 'Chart.js Line Chart',
        },
    },
}

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: [200, 800, 600, 300, 1000, -1000, 400,],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Dataset 2',
            data: [100, 300, -600, 900, -1000, 1000, 200,],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
}

export default function LineChart(
    { 
        labels,
        values,
    } : {
        labels : any[],
        values : object[],
    }
    ){  
        console.log('Outside useEffect')
        console.log(labels)
        console.log(values)
        useEffect(() => {
            console.log('inside useEffect')
            console.log(labels)
            console.log(values)
        }, [])
        return(
            <>
                {
                    Object.keys(values[0]).map(key => {
                        const valueArray : number[] = []
                        values.forEach(val => valueArray.push(val[key]))
                        const data = {
                            labels,
                            datasets: [
                                {
                                    label: key,
                                    data: valueArray,
                                    borderColor: 'rgb(255, 99, 132)',
                                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                                }
                            ]
                        }
                        return <Line options={options} data = {data} />
                    })
                }
                {/* <Line options={options} data={data} /> */}
            </>
        )
}