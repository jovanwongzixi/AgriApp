import AgriCloudSettings from "@/app/components/settings/AgriCloudSettings"
import { AiOutlineUser, AiOutlineCloud} from 'react-icons/ai'
export default function Page({ params }: { params : { userid: string }}){
    return(
        <div className='h-[100vh-85px] flex flex-row mx-24 mt-4 justify-between'>
            <div className='w-[15%] flex flex-col items-stretch font-medium text-lg'>
                <button className='flex flex-row p-3 items-center justify-start text-[#9C9C9C]'><AiOutlineUser /><p className='ml-2'>Profile</p></button>
                <button className='flex flex-row p-3 items-center justify-start py-2 px-3 rounded-lg bg-[#525C54] hover:bg-[#8E918E]'><AiOutlineCloud /><p className='ml-2'>AgriCloud</p></button>
            </div>
            <AgriCloudSettings userid={params.userid}/>
        </div>
    )
}