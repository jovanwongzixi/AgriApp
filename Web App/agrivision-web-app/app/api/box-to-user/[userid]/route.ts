import { db } from '@vercel/postgres'
import { NextResponse } from 'next/server'
export async function GET(
    request : Request,
    { params }: { params: { userid: string } }
){
    const client = await db.connect()

    const results = await client.sql`SELECT BoxID FROM BoxToUser WHERE UserID=${params.userid}`
    return NextResponse.json({ results })
}