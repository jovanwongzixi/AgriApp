import { db } from '@vercel/postgres'
import { NextResponse } from 'next/server'

export async function GET(request: Request){
    const { searchParams } = new URL(request.url)
    const userid = searchParams.get('userid')

    const client = await db.connect()
    const result = await client.sql`SELECT premium FROM users WHERE userid=${userid} AND (premium=TRUE OR share_data=TRUE)`
    if (result.rows.length > 0) return NextResponse.json({}, {status: 200})
    return NextResponse.json({}, {status: 401})
}