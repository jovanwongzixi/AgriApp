'use client'

import { CompatClient, Stomp } from '@stomp/stompjs'
import { useEffect, useRef, useState } from 'react'
import SockJS from 'sockjs-client'
import type { SensorData } from './RealtimeSensorData'
import RealtimeSensorData from './RealtimeSensorData'
import BoxControls from './BoxControls'

export default function WebSocketClient({boxid} : { boxid: string }){
    // let stompClient = useRef<CompatClient>()
    const [stompClient, useStompClient] = useState<CompatClient>()
    const [sensorData, useSensorData] = useState<SensorData>({
        agriBoxID: boxid,
        accounter: "1",
        pH: "5.5",
        temperature: "27.1",
        humidity: "30",
        ec: "12.88",
        pumpStatus: "off",
        fanStatus: "off",
        latency: "200",
    })

    useEffect(() => {
        let socket = new SockJS(`http:/${process.env.NEXT_PUBLIC_BACKEND_IP}:8080/chat`)
        const client = Stomp.over(socket)
        useStompClient(client)
        // stompClient.current = Stomp.over(socket)
        client.connect({}, function(frame :string){
            console.log('Connected' + frame)
            client.subscribe('/topic/sensor-data', function(messageOutput){
                useSensorData(JSON.parse(messageOutput.body))
                console.log(messageOutput.body)
                console.log('received message from springboot' + JSON.parse(messageOutput.body).accounter)
            })
        })
    }, [])

    return(
        <>
            {
                sensorData && <RealtimeSensorData sensorData={sensorData}/>
            }
            <BoxControls client={stompClient} boxid={boxid} controls={{Fan: sensorData.fanStatus, Pump: sensorData.pumpStatus}}/>
            {/* <button onClick={() => stompClient.current?.send('/app/chat', {}, JSON.stringify({AgriBoxID: 'box1', Pump_status:'on', Fan_status: 'on'}))}>Hello button</button> */}
        </>
    )
}