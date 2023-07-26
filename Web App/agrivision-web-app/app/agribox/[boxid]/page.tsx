import Link from 'next/link'
import WebSocketClient from '@/app/components/WebSocketClient'
import HistoricalData from '@/app/components/HistoricalData'
import { getDownloadURL, getStorage, ref } from 'firebase/storage'
import firebaseApp from '@/app/configurations/firebaseConfig'

const storage = getStorage(firebaseApp)
const storageRef = ref(storage, `gs://${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/readings/box1_readings.csv`)
export default async function Page({ 
    params,
    searchParams,
 }: {
    params : { boxid: string },
    searchParams: { 
        variable: string | undefined,
        period: number | undefined
    }
}){
    // check working
    // let hasBox = true
    // if (!await checkUserHasBox(params.boxid, params.userid)) hasBox = false
    const period = searchParams.period ?? '1'
    const res = await fetch(`${process.env.BASE_URL}/api/line-chart-data?boxid=${params.boxid}&period=${period}`)
    const {labels, values, error} = await res.json()
    if(res.status !== 200) throw new Error(error)

    const fileURL = await getDownloadURL(storageRef)
    return(
        <div className='px-28 h-[calc(100vh-130px)]'>
            <div className='text-white flex flex-row justify-between my-3 items-center'>
                <WebSocketClient boxid={params.boxid}/>
                <Link 
                    prefetch={false}
                    className='border rounded-2xl bg-white hover:bg-[#D9D9D9] text-black text-center max-h-fit p-2'
                    href={`/agribox/${params.boxid}/cv`}
                ><p>View Computer</p><p>Vision</p></Link>
                <a 
                    className='border rounded-2xl bg-white hover:bg-[#D9D9D9] text-black text-center max-h-fit p-2' 
                    download 
                    href={fileURL}
                >Download Historical Data</a>
            </div>
            <HistoricalData labels={labels} values={values} boxid={params.boxid}/>
            {/* <DataVis boxid={params.boxid} controllable/> */}
            {/* {hasBox === false ? <>Do not own box</> :<></>} */}
        </div>
    )
}