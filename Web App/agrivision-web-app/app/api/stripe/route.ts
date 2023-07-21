import { convertEmailToUserid } from "@/app/helper/functions"
import { NextResponse } from "next/server"
import { stripe } from "@/app/configurations/stripe"
import { cookies } from "next/headers"
import { auth } from "firebase-admin"
import { getAuth } from "firebase/auth"
// const billingUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/farmboys2000/settings`

export async function GET(request: Request){
    const session = cookies().get('session')?.value
    if(!session) return NextResponse.json({error: 'No session!'}, {status: 403})

    const verifiedSession = await auth().verifySessionCookie(session)
    if(!verifiedSession) return NextResponse.json({error: 'Invalid session!'}, {status: 403})

    const email = verifiedSession.email
    const userid = convertEmailToUserid(email)

    if(userid === '') return NextResponse.json({error: 'No user!'}, {status: 403})
    // return NextResponse.json({verifiedSession})
    try{
        const stripeSession = await stripe.checkout.sessions.create({
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/${userid}/settings`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/${userid}/settings`,
            payment_method_types: ["card"],
            mode: "subscription",
            billing_address_collection: "auto",
            customer_email: email,
            line_items: [
                {
                    price: process.env.STRIPE_PRICE_API_ID || '',
                    quantity: 1,
                },
            ],
            metadata: {
                userid: userid,
            },
        })
        return new Response(JSON.stringify({ url: stripeSession.url }))
    } catch(e){
        return NextResponse.json( {error: e}, { status: 500, 'statusText': JSON.stringify(e) })
    }
}