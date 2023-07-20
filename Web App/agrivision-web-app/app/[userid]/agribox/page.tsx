import AgriBoxCard from '@/app/components/agribox/AgriBoxCard'
import { getUserBoxes } from '@/app/helper/agribox'
import type { QueryResultRow } from '@vercel/postgres'

export default async function Page({ params }: { params : { userid: string }}){
    let boxArray: QueryResultRow[] = []
    boxArray = await getUserBoxes(params.userid)
    return(
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
            {
                boxArray?.map(val => <AgriBoxCard key={val.boxid} boxId={val.boxid}/>)
            }
        </div> 
    )
}