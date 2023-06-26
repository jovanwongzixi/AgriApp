import { auth } from 'firebase-admin'
import { kv } from '@vercel/kv'
import { cookies, headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import firebaseAdminApp from '@/configurations/firebaseAdminConfig'

const app = firebaseAdminApp

export async function POST(request: NextRequest, response: NextResponse) {
    const authorization = headers().get("Authorization")
    if (authorization?.startsWith("Bearer ")) {
      const idToken = authorization.split("Bearer ")[1].split(" ")[0] // hope that session token wont have space
      const userId = authorization.split("Bearer ")[1].split(" ")[1]
      const decodedToken = await auth().verifyIdToken(idToken)
      
      if (decodedToken) {
        //Generate session cookie
        const expiresIn = 60 * 60 * 24 * 5 * 1000;
        const sessionCookie = await auth().createSessionCookie(idToken, {
          expiresIn,
        })
        const options = {
          name: "session",
          value: sessionCookie,
          maxAge: expiresIn,
          httpOnly: true,
          secure: true,
        }
  
        //Add the cookie to the browser
        cookies().set(options)
        cookies().set({
          name: 'currentuser',
          value: userId,
          maxAge: expiresIn,
          httpOnly: true,
        })

        // add session to vercel kv (redis)
        await kv.set(userId,sessionCookie)
      }
      return NextResponse.json({}, { status: 200 })
    }
  
    return NextResponse.json({}, { status: 401 })
}

export async function GET(request: NextRequest) {
    const session = cookies().get("session")?.value || ""

    //Validate if the cookie exist in the request
    if (!session) {
        return NextResponse.json({ isLogged: false }, { status: 401 })
    }

    //Use Firebase Admin to validate the session cookie
    const decodedClaims = await auth().verifySessionCookie(session, true)

    if (!decodedClaims) {
        return NextResponse.json({ isLogged: false }, { status: 401 })
    }

    return NextResponse.json({ isLogged: true }, { status: 200 })
}