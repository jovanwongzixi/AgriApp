import { db } from '@vercel/postgres'

import DataVis from '@/app/components/DataVis'


export default function Page({ params }: { params : { boxid: string, userid: string }}){
    
    return(
        <div>
            <DataVis boxid={params.boxid} controllable={false}/>
            {/* {hasBox === false ? <>Do not own box</> :<></>} */}
        </div>
    )
}