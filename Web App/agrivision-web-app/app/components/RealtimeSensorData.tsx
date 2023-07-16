'use client'

export type SensorData = {
    agriBoxID: string,
    accounter: string,
    pH: string,
    temperature: string,
    humidity: string,
    ec: string,
    pumpStatus: string,
    fanStatus: string,
    latency: string,
}

const tableHeaders = ['temperature', 'humidity', 'ec', 'pH']

export default function RealtimeSensorData({ sensorData } : { sensorData: SensorData }){
    return(
        <table>
            <caption>{sensorData.agriBoxID}</caption>
            <thead>
                <tr>
                    {
                        tableHeaders.map(header => <th key={header}>{header}</th>)
                    }
                </tr>
            </thead>
            <tbody>
                <tr>
                    {
                        tableHeaders.map(header => <td key={header}>{sensorData[header as keyof SensorData]}</td>)
                    }
                </tr>
            </tbody>
        </table>
    )
}