'use client'

import { BaseSyntheticEvent } from 'react'

export default function AgriCloudSettingsClient(){
    async function onSubmit(event: BaseSyntheticEvent){
        event.preventDefault()
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/stripe`)
        if (!response.ok){
            console.error(response.status)
            console.error(response.statusText)
            return
        }
        const resJson = await response.json()
        console.log(resJson)
        if(!response.ok){
            console.error(resJson.error)
            return
        }
        
        if(resJson){
            window.location.href = resJson.url as string
        }
    }
    return(
        <form onSubmit={onSubmit}>

            <button>Subscribe to Premium</button>
        </form>

    )
}