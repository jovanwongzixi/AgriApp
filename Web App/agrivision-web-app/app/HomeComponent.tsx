'use client'

import { User } from 'firebase/auth'
import { useAuthContext } from './context/auth-provider'
import LoginForm from './LoginForm'
import { LandingPage } from './LandingPage'
import { convertEmailToUserid } from './helper/functions'

export default function HomeComponent(){
    let { user } = useAuthContext()
    if(user){
        return(
            <LandingPage userid={convertEmailToUserid(user.email)}/>
        )
    }
    else{
        return <LoginForm />
    }
}