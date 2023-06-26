import LineChart from '@/app/components/agribox/LineChart'

export default function DataVis({ boxid, controllable } : { boxid: string, controllable: boolean}){

    return(
        <div>
            <h1>{boxid}</h1>
            <LineChart />
        </div>
    )
}