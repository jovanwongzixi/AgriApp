'use client'

import { useEffect } from 'react'
import type { CompatClient } from '@stomp/stompjs'

type ControlsStatus = {
    Fan: 'on' | 'off',
    Pump: 'on' | 'off',
}

function IndividualControl({ name, state, onChange } : { name: string, state: boolean, onChange : (e: React.ChangeEvent<HTMLInputElement>) => void }){
    return(
        <div className='flex flex-row justify-between m-3'>
            <p className='pr-5'>{name}</p>
            <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" name={name} className="sr-only peer" checked={state} onChange={onChange}/>
                <div className="w-11 h-6 peer-focus:outline-none rounded-full peer bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white hover:after:ring-4 hover:after:ring-gray-400/60 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white peer-checked:after:bg-[#6AFF67] after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600"></div>
            </label>
        </div>
    )
}

export default function BoxControls({
    client, 
    boxid, 
    controls 
} : {
    client : CompatClient | undefined, 
    boxid : string,
    controls: ControlsStatus
}){
    // const [controlsStatus, useControlsStatus] = useState<ControlsStatus>(controls)
    // useEffect(()=>{
    //     console.log(controlsStatus)
    //     // console.log(client)
    //     client?.send('/app/chat', {}, JSON.stringify({AgriBoxID: 'box1', Pump_status: controlsStatus.Pump, Fan_status: controlsStatus.Fan}))
    // }, [controlsStatus])

    useEffect(() => {
        async function pushControlStatus(){
            await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/agribox/control-time`, {
                method: 'POST',
                body: JSON.stringify({
                    time: new Date(),
                    fan: controls.Fan,
                    pump: controls.Pump,
                    boxid: boxid
                })
            })
        }
        pushControlStatus()
    }, [controls.Fan, controls.Pump])

    // console.log(controlsStatus)
    const onChangeControl = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {name, checked} = e.target
        // console.log(name)
        // console.log(checked)
        if(name === 'Fan'){
            console.log('switch fan')
            client?.send('/app/chat', {}, JSON.stringify({AgriBoxID: boxid, Pump_status: controls.Pump, Fan_status: checked ? 'on' : 'off'}))
        }
        else if(name === 'Pump'){
            console.log('switch pump')
            client?.send('/app/chat', {}, JSON.stringify({AgriBoxID: boxid, Pump_status: checked ? 'on' : 'off', Fan_status: controls.Fan}))
        }

        // useControlsStatus(prevVal => {
        //     return {
        //         ...prevVal,
        //         [name as keyof ControlsStatus]: checked ? 'on' : 'off'
        //     }
        // })
    }
    return(
        <div className='rounded-2xl border-[#9E9E9E] border-[1px] max-w-fit'>
            {
                client ? (
                    <>
                        <IndividualControl name='Fan' state={controls.Fan === 'on'} onChange={onChangeControl}/>
                        <IndividualControl name='Pump' state={controls.Pump === 'on'} onChange={onChangeControl}/>
                    </>
                ) : <p>Loading websocket client...</p>
            }
        </div>
    )
}