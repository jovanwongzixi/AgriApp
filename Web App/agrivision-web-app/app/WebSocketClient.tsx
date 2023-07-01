'use client'

import { CompatClient, Stomp } from '@stomp/stompjs'
import { useEffect, useRef } from 'react'
import SockJS from 'sockjs-client'
export default function WebSocketClient(){
    let stompClient = useRef<CompatClient>()
    useEffect(() => {
        let socket = new SockJS('http://localhost:8080/chat')
        stompClient.current = Stomp.over(socket)
        stompClient.current.connect({}, function(frame :string){
            console.log('Connected' + frame)
            stompClient.current?.subscribe('/topic/sensor-data', function(messageOutput){
            console.log('received message from springboot' + messageOutput.body)
        })
        })
        

    }, [])
    return(
        <>
            <button onClick={() => stompClient.current?.send('app/chat', {}, JSON.stringify({from: 'Nextjs', text:'hello'}))}>Hello button</button>
        </>
    )
}