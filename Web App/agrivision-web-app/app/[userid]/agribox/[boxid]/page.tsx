import { db } from '@vercel/postgres'

import Error from 'next/error'
import LineChart from '@/app/components/agribox/LineChart'

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
        <div>
            {/* {hasBox === false ? <>Do not own box</> :<></>} */}
            <h1>{params.boxid}</h1>
            <LineChart />
        </div>
    )
}