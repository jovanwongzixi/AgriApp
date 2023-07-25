'use client'

import { BaseSyntheticEvent, useEffect, useState } from 'react'
import LineChart from './agribox/LineChart'
import ChartSideBar from './agribox/ChartSideBar'
import type { HistoricalDataVariable, HistoricalDataPeriod } from '../helper/utils'
// import firebaseApp from '../configurations/firebaseConfig'
// import { getFirestore, collection, query, orderBy, limit, DocumentData, Query, getDocs, where, Timestamp } from 'firebase/firestore'

// const firestore = getFirestore(firebaseApp)
// const DATA_INTERVAL_HOURS = 1
// const periodToNumberMap = {
//     day: 
// }

function mean(array : number[]){
    return (array.reduce((a,b) => a+b) / array.length).toFixed(2)
}

function median(array : number[]){
    const arrayMid = Math.floor(array.length/2) , arr = array.sort()
    const median = array.length % 2 !== 0 ? arr[arrayMid] : (arr[arrayMid] + arr[arrayMid-1]) / 2
    return median.toFixed(2)
}
export default function HistoricalData({ 
    labels,
    values,
    boxid,
    // searchParams,
 } : { 
    labels: any[],
    values: any[],
    boxid : string,
    // searchParams: { 
    //     variable: string | undefined,
    //     period: number | undefined
    // }
}){
    const [period, usePeriod] = useState<HistoricalDataPeriod>('1')
    const [variable, useVariable] = useState<HistoricalDataVariable>('temperature')
    const [clientLabel, useClientLabel] = useState(labels)
    const [clientValues, useClientValues] = useState(values)

    const onChangeVariable = (e: BaseSyntheticEvent) => {
        useVariable(e.target.name)
    }
    const onChangePeriod = (e: BaseSyntheticEvent) => {
        usePeriod(e.target.name)
    }

    useEffect(() => {
        async function fetchData(){
            const res = await fetch(`${process.env.BASE_URL}/api/line-chart-data?boxid=${boxid}&period=${period}`)
            const {labels, values, error} = await res.json()
            if(res.status !== 200) throw new Error(error)
            else{
                useClientValues(values)
                useClientLabel(labels)
            }
        }
        fetchData()
    }, [period])
    
    return(
        <div className='border rounded-2xl border-[#BCBCBC] flex flex-col items-center justify-center text-white h-[85%]'>
            <h2 className='mt-0 mb-2'>Historical Data</h2>
            <div className='w-full flex flex-row justify-evenly'>
                    {/* for side buttons to choose which reading to access */}
                <ChartSideBar onChangeVariable={onChangeVariable} selectedVariable={variable} onChangePeriod={onChangePeriod} selectedPeriod={period}/>
                <div className='w-[70%] inline-block bg-transparent'>
                    <LineChart labels={clientLabel} values={clientValues} variable={variable}/>
                </div>
            </div>
            <div className='flex flex-row w-full justify-center mt-2'>
                <table className='border border-collapse w-[50%]'>
                    <thead>
                        <tr className='border text-center'>
                            <td>Mean</td>
                            <td>Median</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='border text-center'>
                            <td>{mean(clientValues.map(val => val[variable]))}</td>
                            <td>{median(clientValues.map(val => val[variable]))}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}