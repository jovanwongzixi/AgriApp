import { headers } from 'next/headers'

import Stripe from 'stripe'
import { stripe } from '@/app/configurations/stripe'

export async function POST(request: Request){
    const body = await request.text()
    const signature = headers().get("Stripe-Signature") as string

    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(
          body,
          signature,
          process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch (error: any) {
        return new Response(`Webhook Error: ${error.message}`, { status: 400 })
    }
    const session = event.data.object as Stripe.Checkout.Session
    
    if (event.type === "checkout.session.completed") {
        // Retrieve the subscription details from Stripe.
        const subscription = await stripe.subscriptions.retrieve(
          session.subscription as string
        )
    }
    return new Response(null, {status: 200})
}