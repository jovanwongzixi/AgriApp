import { auth } from 'firebase-admin'
import { cookies } from 'next/headers'
import { convertEmailToUserid } from './functions'

export async function getUserServerSide(){
    const session = cookies().get('session')?.value
    if(!session) return null

    const verifiedSession = await auth().verifySessionCookie(session)
    if(!verifiedSession) null

    const email = verifiedSession.email
    const userid = convertEmailToUserid(email)

    if(userid === '') return null
    return userid
}