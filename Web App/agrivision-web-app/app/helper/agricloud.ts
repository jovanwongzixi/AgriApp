import { db } from '@vercel/postgres'

export async function checkAgricloudPermission(userid: string){
    const client = await db.connect()
    const result = await client.sql`SELECT * FROM users WHERE userid=${userid} AND (premium=TRUE OR share_data=TRUE)`
    if (result.rows.length > 0) return result.rows.at(0)
    return null
}

export async function getAgriCloudBoxes(userid: string){
    const client = await db.connect()
    const results = await client.sql`SELECT boxid FROM boxtouser NATURAL JOIN users WHERE share_data=true AND userid<>${userid}`
    return results.rows
}