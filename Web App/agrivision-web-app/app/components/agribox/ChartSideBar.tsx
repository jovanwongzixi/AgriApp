'use client'

import { BaseSyntheticEvent } from "react"
import { historicalDataVariables, HistoricalDataVariable, HistoricalDataPeriod, historicalDataPeriods } from "@/app/helper/utils"
import { capitalise, twClassMerge } from '@/app/helper/functions'

const defaultButtonCss = 'rounded-md bg-[#303030] p-2 mb-2 mr-2 border border-white hover:bg-[#808080]'

function SideBarButton({
    name,
    onClick,
    css,
    type
} : {
    name: string,
    onClick: (e: BaseSyntheticEvent) => void,
    css: string,
    type: 'text' | 'numbers'
}){
    if(type === 'text') return(
        <button
            key={name}
            name={name}
            onClick={onClick}
            className={css}
        >{capitalise(name)}</button>
    )
    else if (type === 'numbers') return (
        <button
            key={name}
            name={name}
            onClick={onClick}
            className={css}
        >{name + (parseInt(name) > 1 ? ' days' : ' day')}</button>
    )
}
export default function ChartSideBar({
    selectedVariable,
    selectedPeriod,
    onChangePeriod,
    onChangeVariable,
} : {
    selectedVariable : HistoricalDataVariable | null,
    selectedPeriod : HistoricalDataPeriod | null,
    onChangePeriod : (e: BaseSyntheticEvent) => void,
    onChangeVariable : (e: BaseSyntheticEvent) => void
}){
    return(
        <div className='text-white flex flex-col justify-center'>
            <div className='flex flex-col mb-7'>
                {
                    historicalDataVariables.map(val => {
                        const buttonCss = val === selectedVariable ? twClassMerge(defaultButtonCss, 'text-black bg-[#D9D9D9] hover:text-white') : defaultButtonCss
                        return <SideBarButton key={val} name={val} onClick={onChangeVariable} css={buttonCss} type='text'/>
                    })
                }
            </div>
            <div>
                {
                    historicalDataPeriods.map(val =>{
                        const buttonCss = val === selectedPeriod ? twClassMerge(defaultButtonCss, 'text-black bg-[#D9D9D9] hover:text-white') : defaultButtonCss
                        return <SideBarButton key={val} name={val} onClick={onChangePeriod} css={buttonCss} type='numbers'/>
                    })
                }
            </div>
        </div>
    )
}