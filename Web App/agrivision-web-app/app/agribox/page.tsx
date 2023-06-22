import AgriBoxCard from '../components/agribox/AgriBoxCard'
// import { useAuthContext } from '../context/auth-provider'

async function getUserBoxes( userid: string ){
    const res = await fetch(`http://localhost:3000/api/box-to-user/${userid}`)
    const data = await res.json()
    return data?.results.rows
}

export default async function Page(){
    // const { user } : { user : User | null } = useAuthContext()
    let boxArray = []
    // if(user?.email) 
    boxArray = await getUserBoxes('farmboys2000')
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