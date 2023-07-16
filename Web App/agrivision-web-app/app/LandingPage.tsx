'use client'

import Image from "next/image"
import homebackground from '@/public/homebackground.jpg'
export function LandingPage({ userid }: { userid: string }){
    return(
        <>
            <div
                className='z-[-2] fixed w-screen h-full'
            >
                <Image 
                    src={homebackground}
                    alt='background image'
                    fill
                />
            </div>
            <div 
                className='z-[-1] fixed w-screen h-full'
                style={{background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))'}}
            />
            <div className='flex flex-col items-center justify-between'>
                <div className='text-6xl flex flex-col items-center text-white'>
                    <p>Welcome to AgriVision</p>
                    <p>{userid} !</p>
                </div>
                <div>
                    <div className='bg-black/30 rounded-3xl'>
                        <h1>hello</h1>
                    </div>
                </div>
            </div>
        </>
    )
}