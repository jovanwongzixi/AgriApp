import { headers } from 'next/headers'
import { db } from '@vercel/postgres'
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
    }catch (error: any) {
        return new Response(`Webhook Error: ${error.message}`, { status: 400 })
    }
    const session = event.data.object as Stripe.Checkout.Session
    
    const dbClient = await db.connect()

    if (event.type === "checkout.session.completed") {
        // Retrieve the subscription details from Stripe.
        const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
        )
        const enddate = new Date(subscription.current_period_end * 1000)
        await dbClient.sql`INSERT INTO subscriptions VALUES(${subscription.id}, ${subscription.metadata.userid}, ${enddate as any})`
    }

    if (event.type === "invoice.payment_succeeded") {
      // Retrieve the subscription details from Stripe.
        const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
        )
        const enddate = new Date(subscription.current_period_end * 1000)
        // Update the price id and set the new period end.
        await dbClient.sql`UPDATE subscriptions SET endperiod=${enddate as any} WHERE subscriptionid=${subscription.id}`
    }

    return new Response(null, {status: 200})
}