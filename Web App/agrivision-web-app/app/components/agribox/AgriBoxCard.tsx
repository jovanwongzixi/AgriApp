'use client'

import Image from 'next/image'
import boxphoto from '@/public/boxphoto.jpg'
import { useRouter, usePathname } from 'next/navigation'

export default function AgriBoxCard({ boxId } : { boxId : string }){
    const router = useRouter()
    const pathname = usePathname()
    return(
        <div // need to add disabled state for other boxes
            onClick={() => {
               if(boxId === 'box1') router.push(`${pathname}/${boxId}`)
            }}
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
                {boxId!=='box1' && <div className='absolute z-[1] bg-black/60 w-full h-full'/>}
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
                    src={boxphoto}
                />
            </div>
            <div className='font-semibold text-white text-lg'>
                Box Id: {boxId}
            </div>
        </div>
    )
}