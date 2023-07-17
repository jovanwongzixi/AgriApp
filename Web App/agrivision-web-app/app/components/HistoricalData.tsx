import LineChart from './agribox/LineChart'
import firebaseApp from '../configurations/firebaseConfig'
import { getFirestore, collection, query, orderBy, limit, DocumentData, Query, getDocs, where, Timestamp } from 'firebase/firestore'

const firestore = getFirestore(firebaseApp)
const DATA_INTERVAL_HOURS = 1
// const periodToNumberMap = {
//     day: 
// }
export default async function HistoricalData({ 
    boxid,
    searchParams,
 } : { 
    boxid : string,
    searchParams: { 
        variable: string | undefined,
        period: number | undefined
    }
}){
    
    let q : Query<DocumentData>
    const period = searchParams.period ? searchParams.period : 1
    const variable = searchParams.variable ? searchParams.variable : 'temperature'

    const startTime = new Date()
    startTime.setDate(7) // test only
    startTime.setHours(0)
    startTime.setMinutes(0)
    startTime.setSeconds(0)
    const endTime = new Date(startTime)
    endTime.setDate(startTime.getDate()+1)
    startTime.setDate(startTime.getDate()-period)
    q = query(collection(firestore, boxid), where('timestamp', '>=', Timestamp.fromDate(startTime)), where('timestamp', '<', Timestamp.fromDate(endTime)), orderBy('timestamp'))
    
    // q = query(collection(firestore, boxid), where('timestamp'), orderBy('timestamp', 'desc'))
    const querySnapshot = await getDocs(q)

    const labels : any[] = []
    const values : any[] = []

    if (period === 1){
        querySnapshot.forEach(doc => {
            const timestamp = doc.get('timestamp').toDate().toLocaleTimeString()
            labels.push(timestamp)
            values.push(doc.get(variable))
        })
    }
    else{
        let timestamp : Date = querySnapshot.docs.at(0)?.get('timestamp').toDate()
        let prevDate : Date = timestamp
        let prevDateValue = 0
        let numDataPointPrevDate = 0
        querySnapshot.forEach(doc => {
            timestamp = doc.get('timestamp').toDate()
            if(prevDate.getDate() !== timestamp.getDate()){
                labels.push(prevDate.toLocaleDateString())
                values.push(prevDateValue/numDataPointPrevDate)
                prevDateValue = 0
                numDataPointPrevDate = 0
                prevDate = timestamp
            }
            else{
                numDataPointPrevDate++
                prevDateValue += doc.get(variable)
            }
        })

        // leftover data points not accounted
        if (numDataPointPrevDate > 0){
            labels.push(timestamp.toLocaleDateString())
            values.push(prevDateValue/numDataPointPrevDate)
        }

    }
    return(
        <>
        <div className='border rounded-2xl border-[#BCBCBC] px-4 py-2 flex flex-col items-center'>
            <h2>Historical Data</h2>
            <div className='w-full flex flex-row justify-between'>
                <div>
                    {/* for side buttons to choose which reading to access */}
                </div>
                <LineChart labels={labels} values={values} variable={variable}/>
            </div>
        </div>
        </>
    )
}