export default function AgriBoxCardSkeleton(){
    return(
        <div
            className='col-span-1 cursor-pointer group'
        >
            <div
                className='
                    aspect-square 
                    w-full 
                    relative 
                    overflow-hidden 
                    rounded-xl
                '
            >
                <div className='h-full w-full object-cover animate-pulse bg-[#1C2E18]'/>
            </div>
            <div className='h-4 w-36 rounded-full bg-[#1C2E18] mt-3' />
        </div>
    )
}