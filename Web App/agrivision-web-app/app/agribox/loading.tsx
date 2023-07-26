import AgriBoxCardSkeleton from '../components/skeleton/AgriBoxCardSkeleton'

export default function Loading(){
    return(
        <div
            className='
            pt-24
            mx-8
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8' 
        >
            <AgriBoxCardSkeleton />
            <AgriBoxCardSkeleton />
        </div>
    )
}