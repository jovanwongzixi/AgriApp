// import GrowingLeaveAnimation from '@/app/components/skeleton/GrowingLeaveAnimation'

export default function Loading(){
    return(
        <div className='px-28 h-[calc(100vh-130px)]'>
            <div className='h-[100px] rounded-2xl animate-pulse bg-[#1C2E18] my-2'/>
            <div className='h-[85%] rounded-2xl animate-pulse bg-[#1C2E18]'/>
        </div>
    )
}