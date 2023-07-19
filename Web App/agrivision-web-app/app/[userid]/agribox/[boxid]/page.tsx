import { db } from '@vercel/postgres'
import Link from 'next/link'
import DataVis from '@/app/components/DataVis'
import WebSocketClient from '@/app/components/WebSocketClient'
import HistoricalData from '@/app/components/HistoricalData'

async function checkUserHasBox(boxid: string, userid: string){
    const client = await db.connect()
    const result = await client.sql`SELECT * FROM boxtouser WHERE boxid=${boxid} AND userid=${userid}`
    if (result.rows.length === 0) return false
    return true
}

export default async function Page({ 
    params,
    searchParams,
 }: {
    params : { boxid: string, userid: string },
    searchParams: { 
        variable: string | undefined,
        period: number | undefined
    }
}){
    // check working
    // let hasBox = true
    // if (!await checkUserHasBox(params.boxid, params.userid)) hasBox = false
    const period = searchParams.period ?? '1'
    const res = await fetch(`http://localhost:3000/api/line-chart-data?boxid=${params.boxid}&period=${period}`)
    const {labels, values} = await res.json()
    if(res.status !== 200) throw new Error('Invalid fetch request!')
    return(
        <div className='pl-28 pr-28 h-[calc(100vh-130px)]'>
            <div className='text-white flex flex-row justify-between my-3 items-center'>
                <WebSocketClient boxid={params.boxid}/>
                <Link 
                    prefetch={false}
                    className='border rounded-2xl bg-white hover:bg-[#D9D9D9] text-black text-center max-h-fit p-2'
                    href={`/${params.userid}/agribox/${params.boxid}/cv`}
                ><p>View Computer</p><p>Vision</p></Link>
            </div>
            <HistoricalData labels={labels} values={values} boxid={params.boxid}/>
            {/* <DataVis boxid={params.boxid} controllable/> */}
            {/* {hasBox === false ? <>Do not own box</> :<></>} */}
        </div>
    )
}