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
        console.log(user)
        if (user == null) router.push('/')
    }, [user])

    const logOut = async () => {
        await signOut(auth)
        console.log('signed out')
    }
    return (
        <>
            <h1>Logged in!</h1>
            <button onClick={logOut}>Log Out</button>
        </>
    )
}
