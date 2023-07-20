'use client'

import { useRouter } from 'next/navigation'
import { useAuthContext } from './context/auth-provider'
import LoginForm from './LoginForm'
import { convertEmailToUserid } from './helper/functions'
import { useEffect } from 'react'

export default function HomeComponent(){
    // let { user } = useAuthContext()
    // const router = useRouter()
    // useEffect(() => {
    //     if(user){
    //         router.push(`/${convertEmailToUserid(user.email)}`)
    //     }
    // }, [user])
    // const [currentUser, useCurrentUser] = useState(user)
    return <LoginForm />

}