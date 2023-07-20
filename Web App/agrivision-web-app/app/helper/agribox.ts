import { db } from '@vercel/postgres'

export async function getUserBoxes(userid: string){
    const client = await db.connect()

    const results = await client.sql`SELECT BoxID FROM BoxToUser WHERE UserID=${userid}`
    return results.rows
}