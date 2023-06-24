'use client'

import { User } from 'firebase/auth'
import { useAuthContext } from '../context/auth-provider'
import Avatar from './navbar/Avatar'
import { useEffect } from 'react'

export default function Navbar(){
    const { user } : { user : User | null } = useAuthContext()
    useEffect(()=>{
        user?.getIdToken().then(val => console.log(`Bearer ${val} ${user?.email}`.split("Bearer ")[1].split(" ")[1]))
    })
    return(
        <nav
            className='justify-between flex flex-row p-5 border-b-[1px]'
        >
            <h1>AgriVision</h1>
            <h2>{ user ? user.email : 'Not Signed In'}</h2>
            <Avatar src={null}/>
        </nav>
    )
}