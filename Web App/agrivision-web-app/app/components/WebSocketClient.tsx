'use client'

import { Client, CompatClient, Stomp } from '@stomp/stompjs'
import { useEffect, useRef, useState } from 'react'
import SockJS from 'sockjs-client'
import type { SensorData } from './RealtimeSensorData'
import RealtimeSensorData from './RealtimeSensorData'
import BoxControls from './BoxControls'

export default function WebSocketClient({boxid} : { boxid: string }){
    let stompClient = useRef<CompatClient>()
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
        let socket = new SockJS('http://localhost:8886/chat')
        stompClient.current = Stomp.over(socket)
        stompClient.current.connect({}, function(frame :string){
            console.log('Connected' + frame)
            stompClient.current?.subscribe('/topic/sensor-data', function(messageOutput){
                useSensorData(JSON.parse(messageOutput.body))
                console.log('received message from springboot' + JSON.parse(messageOutput.body).accounter)
            })
        })
    }, [])

    return(
        <>
            {
                sensorData && <RealtimeSensorData sensorData={sensorData}/>
            }
            <BoxControls client={stompClient.current} boxid={boxid}/>
            {/* <button onClick={() => stompClient.current?.send('/app/chat', {}, JSON.stringify({AgriBoxID: 'box1', Pump_status:'on', Fan_status: 'on'}))}>Hello button</button> */}
        </>
    )
}