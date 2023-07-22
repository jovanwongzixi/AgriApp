'use client'

import { useAuthContext } from './context/auth-provider'
import LoginForm from './LoginForm'
import { convertEmailToUserid } from './helper/functions'
import { LandingPage } from './LandingPage'

export default function HomeComponent(){
    let { user } = useAuthContext()
    if (user) {
        return <LandingPage userid={convertEmailToUserid(user.email)}/>
    } else {
        return <LoginForm />
    }
}