'use client'

import { useState } from 'react'
import type { CompatClient } from '@stomp/stompjs'

function IndividualControl({ name, state, onChange } : { name: string, state: boolean, onChange : (e: React.ChangeEvent<HTMLInputElement>) => void }){
    // const [controlStatus, useControlStatus] = useState<boolean>()
    return(
        <div className='flex flex-row'>
            <p>{name}</p>
            <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" name={name} className="sr-only peer" checked={state} onChange={onChange}/>
                <div className="w-11 h-6 peer-focus:outline-none rounded-full peer bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white hover:after:ring-4 hover:after:ring-gray-400/60 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white peer-checked:after:bg-[#6AFF67] after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600"></div>
                {/* <span className="ml-3 text-sm font-medium text-gray-300">Toggle me</span> */}
            </label>
        </div>
    )
}

export default function BoxControls({ client } : {client : CompatClient | undefined}){
    const [controlsStatus, useControlsStatus] = useState({
        Fan: false,
        Pump: false
    })

    const onChangeControl = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {name, checked} = e.target
        useControlsStatus(prevVal => {
            return {
                ...prevVal,
                [name]: checked
            }
        })
    }
    return(
        <div className='rounded-2xl border-[#9E9E9E] border-[1px] p-2 max-w-fit'>
            <IndividualControl name='Fan' state={controlsStatus['Fan']} onChange={onChangeControl}/>
            <IndividualControl name='Pump' state={controlsStatus['Pump']} onChange={onChangeControl}/>
        </div>
    )
}