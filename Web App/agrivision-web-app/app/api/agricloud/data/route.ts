import { db } from "@vercel/postgres"
import { NextResponse } from "next/server"

export async function GET(request: Request){
    const { searchParams } = new URL(request.url)
    const userid = searchParams.get('userid')

    const client = await db.connect()
    const results = await client.sql`SELECT boxid FROM boxtouser NATURAL JOIN users WHERE share_data=true AND userid<>${userid}`
    return NextResponse.json({results}, {status:200})
}