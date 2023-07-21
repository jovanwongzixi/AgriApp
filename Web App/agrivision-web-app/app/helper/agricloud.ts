import { VercelPoolClient, db } from '@vercel/postgres'

export async function checkAgricloudPermission(userid: string){
    const client = await db.connect()
    const result = client.sql`SELECT * FROM users WHERE userid=${userid} AND share_data=TRUE`
    const [share_data, premium] = await Promise.all([result, checkPremiumNeedClient(client, userid)])
    if ((share_data.rows.length > 0) && premium ) return {shareData: share_data.rows!.at(0)?.share_data, premium: premium}
    return null
}

export async function getAgriCloudBoxes(userid: string){
    const client = await db.connect()
    const results = await client.sql`SELECT boxid FROM boxtouser NATURAL JOIN users WHERE share_data=true AND userid<>${userid}`
    return results.rows
}

export async function checkPremium(userid: string){
    const client = await db.connect()
    return await checkPremiumNeedClient(client, userid)
}

async function checkPremiumNeedClient(client: VercelPoolClient, userid: string){
    const result = await client.sql`SELECT endperiod FROM subscription WHERE userid=${userid}`
    if (result.rowCount === 0) return false
    if (result.rows.at(0)!.endperiod?.getTime() + 86_400_000 > Date.now()) return true
    return false
}