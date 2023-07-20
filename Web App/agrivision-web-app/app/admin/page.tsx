'use client'

import { useEffect } from 'react'
import { useAuthContext } from '../context/auth-provider'
import { signOut, getAuth } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { auth } from '../context/auth-provider'

export default function Page() {
    let { user } = useAuthContext()
    const router = useRouter()
    useEffect(() => {
        console.log(user?.uid)
        if (user == null) router.push('/')
    }, [user])

    const logOut = async () => {
        const signOutClient = signOut(auth)
        const signOutServer = async () => {
            const res = await fetch(`${process.env.BASE_URL}/api/logout`, {
                method: 'GET'
            })
            return res.status
        }
        const [, logoutServerStatus] = await Promise.all([signOutClient, signOutServer()])
        console.log('signed out')
    }
    return (
        <>
            <h1>Logged in!</h1>
            <button onClick={logOut}>Log Out</button>
        </>
    )
}
