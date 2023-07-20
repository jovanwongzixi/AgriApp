import LineChart from '@/app/components/agribox/LineChartOld'
import firebaseApp from '../configurations/firebaseConfig'
import { getFirestore, doc, onSnapshot, query, collection, orderBy, limit, getDocs } from 'firebase/firestore'
import type { DocumentData } from 'firebase/firestore'
import WebSocketClient from './WebSocketClient'


export default async function DataVis({ boxid, controllable } : { boxid: string, controllable: boolean}){
    const db = getFirestore(firebaseApp)
    const xAxisTimeArray : any[] = []
    const yAxisValueArray : object[]= []
    const q = query(collection(db, 'box1'), orderBy('timestamp'), limit(3))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
        xAxisTimeArray.push(doc.get('timestamp').toDate())
        const values = doc.data()
        delete values['timestamp']
        yAxisValueArray.push(values)
    })
    // onSnapshot(q, (snapshot) => {
    //     snapshot.docChanges().forEach(change => {
    //         if(change.type === 'added'){
    //             console.log(change.doc.data())
    //             console.log('Timestamp: ' + change.doc.get('timestamp').toDate())
    //             //append to array
    //             xAxisTimeArray.push(change.doc.get('timestamp'))
    //             const values = change.doc.data()
    //             delete values['timestamp']
    //             yAxisValueArray.push(values)
    //         }
    //         else if(change.type === 'removed'){
    //             // remove from head of array
    //             xAxisTimeArray.splice(0)
    //             yAxisValueArray.splice(0)
    //         }
            
    //     })
    // })
    return(
        <div>
            <h1 className='text-white absolute left-4'>{boxid}</h1>
            <LineChart labels={xAxisTimeArray} values={yAxisValueArray} />
            {/* <WebSocketClient /> */}
        </div>
    )
}