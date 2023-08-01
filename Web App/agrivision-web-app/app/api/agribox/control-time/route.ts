import { getUserServerSide } from '@/app/helper/server-functions'
import { db } from '@vercel/postgres'
import { NextResponse } from 'next/server'



export async function POST(request: Request){
    const [userid, client, body] = await Promise.all([getUserServerSide(), db.connect(), request.json()])
    if (!userid || !client || !body) return NextResponse.json({error: 'Error'}, {status: 400})

    const {time, pump, fan, boxid} = body
    try{
        await client.sql`UPDATE boxtouser SET controlledtime=${time}, fan=${fan}, pump=${pump} WHERE userid=${userid} AND boxid=${boxid}`
        return NextResponse.json({}, {status: 200})
    }catch(e){
        return NextResponse.json({error: e}, {status: 500})
    }
}

export async function GET(request: Request){
    const url = new URL(request.url)
    const boxid = url.searchParams.get('boxid')
    // const userid = url.searchParams.get('userid')
    // const client = await db.connect()
    const [userid, client] = await Promise.all([getUserServerSide(), db.connect()])
    const result = await client.sql`SELECT controlledtime, fan, pump FROM boxtouser WHERE userid=${userid} AND boxid=${boxid}`
    console.log(userid)
    if (result.rowCount === 0) return NextResponse.json({error: "no results"}, {status: 400})
    return NextResponse.json(result, {status: 200})
}