import firebaseApp from '@/app/configurations/firebaseConfig'
import { getFirestore, collection, query, orderBy, limit, DocumentData, Query, getDocs, where, Timestamp } from 'firebase/firestore'
import { NextResponse } from 'next/server'

const firestore = getFirestore(firebaseApp)
const acceptedPeriods = ['1', '7', '30']
type allReadings = {
    temperature: any,
    ec: any,
    pH: any,
    humidity: any
}

export async function GET(request:Request){
    const { searchParams } = new URL(request.url)
    let period = searchParams.get('period')
    const boxid = searchParams.get('boxid')
    // if period not defined, fetch data for 1 day
    if(!period) period = '1'
    if (!boxid) return NextResponse.json({error: 'No boxid'},{status: 400})
    if(!acceptedPeriods.includes(period)) return NextResponse.json({error: 'Period value not accepted!'}, {status: 400})

    let q : Query<DocumentData>
    // const period = searchParams.period ? searchParams.period : 1
    // const variable = searchParams.variable ? searchParams.variable : 'temperature'

    const startTime = new Date()
    // startTime.setDate(7) // test only
    startTime.setHours(0)
    startTime.setMinutes(0)
    startTime.setSeconds(0)
    const endTime = new Date(startTime)
    endTime.setDate(startTime.getDate()+1)
    startTime.setDate(startTime.getDate()-parseInt(period))
    q = query(collection(firestore, boxid), where('timestamp', '>=', Timestamp.fromDate(startTime)), where('timestamp', '<', Timestamp.fromDate(endTime)), orderBy('timestamp'))
    
    // q = query(collection(firestore, boxid), where('timestamp'), orderBy('timestamp', 'desc'))
    const querySnapshot = await getDocs(q)
    if(querySnapshot.empty) return NextResponse.json({error: 'No results!'},{status: 500})
    const labels : string[] = []
    const values : allReadings[] = []

    if (period === '1'){
        querySnapshot.forEach(doc => {
            const timestamp = doc.get('timestamp').toDate().toLocaleTimeString() as string
            labels.push(timestamp)
            values.push({
                temperature: doc.get('temperature'),
                ec: doc.get('ec'),
                humidity: doc.get('humidity'),
                pH: doc.get('ph')
            })
            // values.push(doc.get(variable))
        })
    }
    else{
        let timestamp : Date = querySnapshot.docs.at(0)?.get('timestamp').toDate()
        let prevDate : Date = timestamp
        let prevDateValue: allReadings = {
            temperature: 0,
            ec: 0,
            humidity: 0,
            pH: 0
        }
        let numDataPointPrevDate = 0
        querySnapshot.forEach(doc => {
            timestamp = doc.get('timestamp').toDate()
            const data = doc.data()

            if(prevDate.getDate() !== timestamp.getDate()){
                labels.push(prevDate.toLocaleDateString())
                values.push({
                    temperature: prevDateValue.temperature/numDataPointPrevDate,
                    ec: prevDateValue.ec/numDataPointPrevDate,
                    humidity: prevDateValue.humidity/numDataPointPrevDate,
                    pH: prevDateValue.pH/numDataPointPrevDate
                })
                prevDateValue = {
                    temperature: 0,
                    ec: 0,
                    humidity: 0,
                    pH: 0
                }
                numDataPointPrevDate = 0
                prevDate = timestamp
            }
            numDataPointPrevDate++
            for(const [key, value] of Object.entries(data)){
                prevDateValue[key as keyof allReadings] += value
            }
        })

        // leftover data points not accounted
        if (numDataPointPrevDate > 0){
            labels.push(timestamp.toLocaleDateString())
            values.push({
                temperature: prevDateValue.temperature/numDataPointPrevDate,
                ec: prevDateValue.ec/numDataPointPrevDate,
                humidity: prevDateValue.humidity/numDataPointPrevDate,
                pH: prevDateValue.pH/numDataPointPrevDate
            })
        }
    }

    return NextResponse.json({labels: labels, values: values}, {status: 200})
}