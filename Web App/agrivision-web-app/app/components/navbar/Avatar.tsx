'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Avatar({ 
    src,
    userid 
} : {
    src : string | null,
    userid: string
}
    ){
        const router = useRouter()

        return(
            <div className='flex flex-row text-white'>
                <h2>{userid !== '' ? userid : 'Not Signed In'}</h2>
                <Image
                    onClick={() => router.push(`/${userid}`)}
                    className='rounded-full cursor-pointer'
                    height='30'
                    width='30'
                    alt="Avatar"
                    src={src || '/placeholder.jpg'}
                />
            </div>
            
    )
}