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
                style={{background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6))'}}
            />
            <div className='flex flex-col items-center justify-evenly h-[calc(100vh-84px)]'>
                <div className='text-6xl flex flex-col items-center text-white'>
                    <p>Welcome to AgriVision</p>
                    <p>{userid} !</p>
                </div>
                <div>
                    <div className='bg-black/40 rounded-3xl h-[150px] py-2 px-5'>
                        <p className='text-xl'>box1 stats</p>
                        <p>Last controlled: {}</p>
                        <p>Fan: {}, Pump: {}</p>
                    </div>
                </div>
            </div>
        </>
    )
}