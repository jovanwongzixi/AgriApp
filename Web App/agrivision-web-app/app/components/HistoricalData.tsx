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
            const res = await fetch(`http://localhost:3000/api/line-chart-data?boxid=${boxid}&period=${period}`)
            const {labels, values, error} = await res.json()
            if(res.status !== 200) throw new Error(error)
            else{
                useClientValues(values)
                useClientLabel(labels)
            }
        }
        fetchData()
    }, [period])
    // let q : Query<DocumentData>
    // const period = searchParams.period ? searchParams.period : 1
    // const variable = searchParams.variable ? searchParams.variable : 'temperature'

    // const startTime = new Date()
    // startTime.setDate(7) // test only
    // startTime.setHours(0)
    // startTime.setMinutes(0)
    // startTime.setSeconds(0)
    // const endTime = new Date(startTime)
    // endTime.setDate(startTime.getDate()+1)
    // startTime.setDate(startTime.getDate()-period)
    // q = query(collection(firestore, boxid), where('timestamp', '>=', Timestamp.fromDate(startTime)), where('timestamp', '<', Timestamp.fromDate(endTime)), orderBy('timestamp'))
    
    // // q = query(collection(firestore, boxid), where('timestamp'), orderBy('timestamp', 'desc'))
    // const querySnapshot = await getDocs(q)

    // const labels : any[] = []
    // const values : any[] = []
    // let queryResultLength = 0
    // if (period === 1){
    //     querySnapshot.forEach(doc => {
    //         const timestamp = doc.get('timestamp').toDate().toLocaleTimeString()
    //         labels.push(timestamp)
    //         values.push(doc.get(variable))
    //     })
    // }
    // else{
    //     let timestamp : Date = querySnapshot.docs.at(0)?.get('timestamp').toDate()
    //     let prevDate : Date = timestamp
    //     let prevDateValue = 0
    //     let numDataPointPrevDate = 0
    //     queryResultLength = querySnapshot.size
    //     querySnapshot.forEach(doc => {
    //         timestamp = doc.get('timestamp').toDate()
    //         if(prevDate.getDate() !== timestamp.getDate()){
    //             labels.push(prevDate.toLocaleDateString())
    //             values.push(prevDateValue/numDataPointPrevDate)
    //             prevDateValue = 0
    //             numDataPointPrevDate = 0
    //             prevDate = timestamp
    //         }
    //         numDataPointPrevDate++
    //         prevDateValue += doc.get(variable)
    //     })

    //     // leftover data points not accounted
    //     if (numDataPointPrevDate > 0){
    //         labels.push(timestamp.toLocaleDateString())
    //         values.push(prevDateValue/numDataPointPrevDate)
    //     }

    // }
    // const res = await fetch(`http://localhost:3000/api/line-chart-data?boxid=${boxid}&period=${searchParams.period}`)
    // const {labels, values} = await res.json()
    return(
        <div className='border rounded-2xl border-[#BCBCBC] flex flex-col items-center justify-center text-white h-[85%]'>
            <h2 className='mt-0 mb-2'>Historical Data</h2>
            <div className='w-full flex flex-row justify-evenly'>
                    {/* for side buttons to choose which reading to access */}
                <ChartSideBar onChangeVariable={onChangeVariable} selectedVariable={variable} onChangePeriod={onChangePeriod} selectedPeriod={period}/>
                <div className='w-[70%] inline-block bg-white'>
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