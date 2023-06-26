import { kv } from '@vercel/kv'
import { NextResponse } from 'next/server'

export async function GET(request: Request){
    const { searchParams } = new URL(request.url)
    const userid = searchParams.get('userid')

    if (!userid) return NextResponse.json({error:'userid not indicated'}, { status: 400 })
    const sessionCookie = await kv.get<string>(userid)

    if(!sessionCookie) return NextResponse.json({error: 'user session does not exist'}, {status: 401})
    
    if(sessionCookie !== searchParams.get('session')) return NextResponse.json({error: 'user session does not match'},{status:401})

    return NextResponse.json({},{status: 200})
    
}