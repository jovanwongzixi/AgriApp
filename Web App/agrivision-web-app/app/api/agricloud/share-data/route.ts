import { NextResponse } from 'next/server'
import { db } from '@vercel/postgres'
import { cookies } from 'next/headers'
import { convertEmailToUserid } from '@/app/helper/functions'
import { auth } from 'firebase-admin'

export async function POST(request: Request){
    const session = cookies().get('session')?.value
    if(!session) return NextResponse.json({error: 'No session!'}, {status: 403})

    const verifiedSession = await auth().verifySessionCookie(session)
    if(!verifiedSession) return NextResponse.json({error: 'Invalid session!'}, {status: 403})

    const email = verifiedSession.email
    const userid = convertEmailToUserid(email)

    if(userid === '') return NextResponse.json({error: 'No user!'}, {status: 403})

    const res = await request.json()
    if(!res) return NextResponse.json({error: 'No request body'}, {status: 400})
    const { shareData } = res

    const client = await db.connect()
    const result = await client.sql`UPDATE users SET share_data=${shareData} WHERE userid=${userid}`

    return NextResponse.json(result, {status: 200})
}