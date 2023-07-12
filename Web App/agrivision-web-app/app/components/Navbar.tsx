'use client'

import { User } from 'firebase/auth'
import { useAuthContext } from '../context/auth-provider'
import Avatar from './navbar/Avatar'
import { useEffect } from 'react'
import Link from 'next/link'
import { convertEmailToUserid } from '../helper/functions'

export default function Navbar(){
    const { user } : { user : User | null } = useAuthContext()
    const userid = convertEmailToUserid(user?.email)
    // useEffect(()=>{
    //     user?.getIdToken().then(val => console.log(`Bearer ${val} ${user?.email}`.split("Bearer ")[1].split(" ")[1]))
    // })
    return(
        <div className="bg-blue-400">
        <nav
            className='justify-between flex flex-row p-5 border-b-[1px]'
        >
            <h1>AgriVision</h1>
            {
                userid !== '' ? (
                    <div>
                        <Link href={`/${userid}/agribox`} className='pr-2 underline'>AgriBox</Link>
                        <Link href={`/${userid}/agricloud`} className='pr-2 underline'>AgriCloud</Link>
                        <Link href={`/${userid}/forum`} className='pr-2 underline'>Forum</Link>
                    </div>
                ) : null
            }
            <Avatar src={null} userid={userid}/>
        </nav>
        </div>
    )
}