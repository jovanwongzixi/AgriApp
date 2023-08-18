import AgriBoxCard from '@/app/components/agribox/AgriBoxCard'
import { checkAgricloudPermission, getAgriCloudBoxes } from '@/app/helper/agricloud'

export default async function Page(){
    const permission = await checkAgricloudPermission()

    if (permission === null){
            throw new Error('Argicloud access denied')

    }

    const boxes = await getAgriCloudBoxes()
    console.log(boxes)
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
                {boxes.map(val => <AgriBoxCard key={val.boxid} boxId={val.boxid}/>)}
                {/* Added for testing purpose */}
                <AgriBoxCard boxId='box1' />
            </div>
        </div>
    )
}