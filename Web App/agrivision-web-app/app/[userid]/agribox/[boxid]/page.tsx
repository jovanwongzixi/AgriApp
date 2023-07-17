import { db } from '@vercel/postgres'
import Error from 'next/error'
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
        period: string | undefined
    }
}){
    // check working
    // let hasBox = true
    // if (!await checkUserHasBox(params.boxid, params.userid)) hasBox = false
    
    return(
        <div className='bg-[#11200E] h-[calc(100vh-71px)] pl-28 pr-28'>
            <div className='text-white flex flex-row justify-between pt-3 items-center'>
                <WebSocketClient boxid={params.boxid}/>
                <Link 
                    prefetch={false}
                    className='border rounded-2xl bg-white hover:bg-[#D9D9D9] text-black text-center max-h-fit p-2'
                    href={`/${params.userid}/agribox/${params.boxid}/cv`}
                ><p>View Computer</p><p>Vision</p></Link>
            </div>
            <HistoricalData boxid={params.boxid} searchParams={searchParams}/>
            {/* <DataVis boxid={params.boxid} controllable/> */}
            {/* {hasBox === false ? <>Do not own box</> :<></>} */}
        </div>
    )
}