import { VercelPoolClient, db } from '@vercel/postgres'
import { getUserServerSide } from './server-functions'

export async function checkAgricloudPermission(){
    const [userid, client] = await Promise.all([getUserServerSide(), db.connect()])
    const result = client.sql`SELECT * FROM users WHERE userid=${userid}`
    const [share_data, { premium }] = await Promise.all([result, checkPremiumNeedClient(client, userid)])
    if ((share_data.rows.length > 0) || premium ) return {shareData: share_data.rows?.at(0)?.share_data as boolean, premium: premium}
    return null
}

export async function getAgriCloudBoxes(){
    const [userid, client] = await Promise.all([getUserServerSide(), db.connect()])
    const results = await client.sql`SELECT boxid FROM boxtouser NATURAL JOIN users WHERE share_data=true AND userid<>${userid}`
    return results.rows
}

export async function checkPremium(){
    const [userid, client] = await Promise.all([getUserServerSide(), db.connect()])
    return await checkPremiumNeedClient(client, userid)
}

async function checkPremiumNeedClient(client: VercelPoolClient, userid: string | null){
    const result = await client.sql`SELECT endperiod, stripe_customerid FROM subscriptions WHERE userid=${userid}`
    if (result.rowCount === 0) return {premium: false, stripeCustomerId: ''}
    if (result.rows.at(0)!.endperiod?.getTime() + 86_400_000 > Date.now()) return {premium: true, stripeCustomerId: result.rows.at(0)!.stripe_customerid as string}
    return {premium: false, stripeCustomerId: ''}
}