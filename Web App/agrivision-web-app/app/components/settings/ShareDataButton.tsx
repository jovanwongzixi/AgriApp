'use client'
import { BaseSyntheticEvent } from 'react'

export default function ShareDataButton({ shareData }: { shareData: boolean | null }){
    const onSubmit = async (e: BaseSyntheticEvent) => {
        // no e.preventDefault will refresh page?

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/agricloud/share-data`,{
            method: 'POST',
            body: JSON.stringify({shareData: !shareData})
        })
        if (!res.ok) console.error('Error changing sharedata status')
        console.log(await res.json())
    }
    return(
        <form onSubmit={onSubmit}>
            <button className='rounded-lg bg-[#D9D9D9] text-black py-2 px-2'>{shareData ? 'Stop Sharing AgriBox Data' : 'Share ArgiBox Data'}</button>
        </form>
    )
}
