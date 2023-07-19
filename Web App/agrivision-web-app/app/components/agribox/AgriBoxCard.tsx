'use client'

import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'

export default function AgriBoxCard({ boxId } : { boxId : string }){
    const router = useRouter()
    const pathname = usePathname()
    return(
        <div
            onClick={() => {router.push(`${pathname}/${boxId}`)}}
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
            <div className='font-semibold text-white text-lg'>
                Box Id: {boxId}
            </div>
        </div>
    )
}