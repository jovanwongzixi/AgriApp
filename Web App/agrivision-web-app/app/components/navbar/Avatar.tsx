'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { auth } from '@/app/context/auth-provider'
import { signOut } from 'firebase/auth'
import { BaseSyntheticEvent, useState } from 'react'
import { twClassMerge } from '@/app/helper/functions'

export default function Avatar({ 
    src,
    userid 
} : {
    src : string | null,
    userid: string
}
    ){
        const router = useRouter()
        const [dropdownOpen, setDropdownOpen] = useState(false)
        window.onclick = function(e: MouseEvent){
            // console.log(e.target)
            if(e.target !== document.getElementById('dropdown-btn')){
                setDropdownOpen(false)
            }
        }
        const onClickDropDown = (e: BaseSyntheticEvent) => {
            // console.log(e)
            setDropdownOpen(val => !val)
        }

        const logOut = async () => {
            const signOutClient = signOut(auth)
            const signOutServer = async () => {
                const res = await fetch(`${process.env.BASE_URL}/api/logout`, {
                    method: 'GET'
                })
                return res.status
            }
            await Promise.all([signOutClient, signOutServer()])
            console.log('signed out')
            router.push('/')
        }

        return(
            <div className='flex flex-row text-white'>
                <div className='relative inline-block'>
                    <button id='dropdown-btn' onClick={onClickDropDown}>{userid}</button>
                    <div className={twClassMerge('peer absolute py-1 bg-[#102507] min-w-fit overflow-auto z-10 rounded-lg peer-focus:block', !dropdownOpen && 'hidden')}>
                        <button className='py-1 w-full hover:bg-gray-600' onClick={() => router.push('/settings')}>Settings</button>
                        {/* <hr /> */}
                        <button className='py-1 hover:bg-gray-600 w-full text-red-700' onClick={logOut}>Logout</button>
                    </div>
                </div>
                <Image
                    onClick={() => router.push('/')}
                    className='rounded-full cursor-pointer'
                    height='30'
                    width='30'
                    alt="Avatar"
                    src={src || '/placeholder.jpg'}
                />
            </div>
    )
}