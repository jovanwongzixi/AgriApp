import { db } from '@vercel/postgres'
import AgriBoxCard from '@/app/components/agribox/AgriBoxCard'

async function checkAgricloudPermission(userid: string){
    const client = await db.connect()
    const result = await client.sql`SELECT premium FROM users WHERE userid=${userid} AND (premium=TRUE OR share_data=TRUE)`
    if (result.rows.length > 0) return true
    return false
}

export default async function Page({ params }: { params: { userid: string }}){
    const permission = await checkAgricloudPermission(params.userid)

    if (!permission){
            throw new Error('Argicloud access denied')

    }

    const boxesResponse = await fetch(`http://localhost:3000/api/agricloud/data?userid=${params.userid}`, {next: {revalidate: 60}})
    const boxes = await boxesResponse.json()

    // need set up empty results component
    return(
        <div>
            <h1 className="text-white">Agricloud access permitted!</h1>
            <div
                className='
                pt-24
                grid 
                grid-cols-1 
                sm:grid-cols-2 
                md:grid-cols-3 
                lg:grid-cols-4
                xl:grid-cols-5
                2xl:grid-cols-6
                gap-8' 
            >
                {boxes.results.rows.map(val => <AgriBoxCard boxId={val.boxid}/>)}
            </div>
        </div>
    )
}