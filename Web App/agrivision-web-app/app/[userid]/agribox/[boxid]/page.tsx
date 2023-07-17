import { db } from '@vercel/postgres'
import Error from 'next/error'

import DataVis from '@/app/components/DataVis'
import WebSocketClient from '@/app/components/WebSocketClient'

async function checkUserHasBox(boxid: string, userid: string){
    const client = await db.connect()
    const result = await client.sql`SELECT * FROM boxtouser WHERE boxid=${boxid} AND userid=${userid}`
    if (result.rows.length === 0) return false
    return true
}

export default async function Page({ params }: { params : { boxid: string, userid: string }}){
    // check working
    // let hasBox = true
    // if (!await checkUserHasBox(params.boxid, params.userid)) hasBox = false
    
    return(
        <div className='bg-[#11200E] h-[calc(100vh-71px)] pl-28 pr-28'>
            <div className='text-white flex flex-row justify-between'><WebSocketClient boxid={params.boxid}/></div>
            {/* <DataVis boxid={params.boxid} controllable/> */}
            {/* {hasBox === false ? <>Do not own box</> :<></>} */}
        </div>
    )
}