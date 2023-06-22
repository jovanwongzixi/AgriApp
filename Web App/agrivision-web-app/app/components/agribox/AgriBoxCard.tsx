import Image from 'next/image'
// import { useRouter } from 'next/navigation'

export default function AgriBoxCard({ boxId } : { boxId : string }){
    // const router = useRouter()

    return(
        <div
            // onClick={() => {router.push(`/agribox/${boxId}`)}}
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
                <Image 
                    fill
                    className='
                        object-cover 
                        h-full 
                        w-full 
                        group-hover:scale-110 
                        transition
                    '
                    alt='AgriBox'
                    src={''}
                />
            </div>
            <div className='font-semibold text-lg'>
                Box Id: {boxId}
            </div>
        </div>
    )
}