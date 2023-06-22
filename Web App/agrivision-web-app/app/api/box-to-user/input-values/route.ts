import { db } from '@vercel/postgres'
import { NextResponse } from 'next/server'

export async function GET(){
    const client = await db.connect()

    try {
        // await client.sql`CREATE TABLE BoxToUser ( BoxID varchar(255) NOT NULL, UserID varchar(255) NOT NULL, PRIMARY KEY (BoxID, UserID))`
        // const dataArray = [{BoxID: 'box1', UserID: 'farmboys2000@gmail.com'},{BoxID: 'box2', UserID: 'farmboys2000@gmail.com'}]
        const dataArray = [{BoxID: 'box1', UserID: 'farmboys2000'},{BoxID: 'box2', UserID: 'farmboys2000'}]
        dataArray.forEach(async (val) => {
            await client.sql`INSERT INTO BoxToUser VALUES (${val.BoxID}, ${val.UserID})`
        })
    } catch (error){
        return NextResponse.json({error})
    }
    const results = await client.sql`SELECT * FROM BoxToUser WHERE UserID=${'farmboys2000'}`
    return NextResponse.json({ results })
}