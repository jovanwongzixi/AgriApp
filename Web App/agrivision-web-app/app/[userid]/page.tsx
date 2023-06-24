'use client'

import { useEffect } from 'react'
import { useAuthContext } from '../context/auth-provider'
import { signOut, getAuth } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { auth } from '../context/auth-provider'

// async function getCurrentUser(){
//     const res = await fetch(`http://localhost:3000/api/get-user`)
//     const resJson = await res.json()
//     return resJson.userid
// }

export default function Page() {
    let { user } = useAuthContext()
    const router = useRouter()
    useEffect(() => {
        // getCurrentUser().then(val => console.log(val))
        // fetch(`http://localhost:3000/api/get-user`).then(res => res.json()).then(val => console.log(`TEST ${val.userid}`))
        console.log(user?.uid)
        if (user == null) router.push('/')
    }, [user])

    const logOut = async () => {
        const signOutClient = signOut(auth)
        const signOutServer = async () => {
            const res = await fetch("http://localhost:3000/api/logout", {
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
