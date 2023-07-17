'use client'

import { BaseSyntheticEvent } from "react"
import { historicalDataVariables, HistoricalDataVariable, HistoricalDataPeriod, historicalDataPeriods } from "@/app/helper/utils"
import { capitalise, twClassMerge } from '@/app/helper/functions'

const defaultButtonCss = 'rounded-md bg-[#303030] p-2 mb-2 mr-2'

function SideBarButton({
    name,
    onClick,
    css
} : {
    name: string,
    onClick: (e: BaseSyntheticEvent) => void,
    css: string
}){
    return(
        <button
            key={name}
            name={name}
            onClick={onClick}
            className={css}
        >{capitalise(name)}</button>
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
        <div className='text-white flex flex-col'>
            <div className='flex flex-col'>
                {
                    historicalDataVariables.map(val => {
                        const buttonCss = val === selectedVariable ? twClassMerge(defaultButtonCss, 'text-black bg-[#D9D9D9]') : defaultButtonCss
                        return <SideBarButton name={val} onClick={onChangeVariable} css={buttonCss} />
                    })
                }
            </div>
            <div>
                {
                    historicalDataPeriods.map(val =>{
                        const buttonCss = val === selectedPeriod ? twClassMerge(defaultButtonCss, 'text-black bg-[#D9D9D9]') : defaultButtonCss
                        return <SideBarButton name={val} onClick={onChangePeriod} css={buttonCss} />
                    })
                }
            </div>
        </div>
    )
}