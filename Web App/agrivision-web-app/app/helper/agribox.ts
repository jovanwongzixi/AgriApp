import { db } from '@vercel/postgres'
import { getUserServerSide } from './server-functions'

export async function getUserBoxes(){
    const [userid, client] = await Promise.all([getUserServerSide(), db.connect()])
    const results = await client.sql`SELECT BoxID FROM BoxToUser WHERE UserID=${userid}`
    return results.rows
}

export async function checkUserHasBox(boxid: string){
    const [userid, client] = await Promise.all([getUserServerSide(), db.connect()])
    const result = await client.sql`SELECT * FROM boxtouser WHERE boxid=${boxid} AND userid=${userid}`
    if (result.rows.length === 0) return false
    return true
}