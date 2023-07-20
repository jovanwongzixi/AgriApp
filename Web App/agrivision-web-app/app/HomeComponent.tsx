'use client'

import { useRouter } from 'next/navigation'
import { useAuthContext } from './context/auth-provider'
import LoginForm from './LoginForm'
import { convertEmailToUserid } from './helper/functions'
import { useState } from 'react'

export default function HomeComponent(){
    let { user } = useAuthContext()
    const [currentUser, useCurrentUser] = useState(user)
    const router = useRouter()
    if(currentUser){
        router.push(`/${convertEmailToUserid(currentUser.email)}`)
    }
    else{
        return <LoginForm />
    }
}