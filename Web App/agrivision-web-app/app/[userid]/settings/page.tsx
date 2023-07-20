import AgriCloudSettings from "@/app/components/settings/AgriCloudSettings"

export default function Page({ params }: { params : { userid: string }}){
    return(
        <div className='h-[100vh-85px] flex flex-row px-28 mt-4 justify-center'>
            <div className='w-[20%]'>
                AgriCloud
            </div>
            <AgriCloudSettings userid={params.userid}/>
        </div>
    )
}