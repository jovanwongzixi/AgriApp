'use client'

export type SensorData = {
    agriBoxID: string,
    accounter: string,
    pH: string,
    temperature: string,
    humidity: string,
    ec: string,
    pumpStatus: 'on' | 'off',
    fanStatus: 'on' | 'off',
    latency: string,
}

const tableHeaders = ['temperature', 'humidity', 'ec', 'pH']
const tableDisplayHeaders = {
    temperature: 'Temperature/°C',
    humidity: 'Humidity',
    ec: 'EC',
    pH: 'pH'
}

export default function RealtimeSensorData({ sensorData } : { sensorData: SensorData }){
    return(
        <table className='border border-collapse w-[50%]'>
            <caption>{sensorData.agriBoxID} Real-time data</caption>
            <thead>
                <tr>
                    {
                        tableHeaders.map(header => <th className='border' key={header}>{tableDisplayHeaders[header as keyof typeof tableDisplayHeaders]}</th>)
                    }
                </tr>
            </thead>
            <tbody>
                <tr>
                    {
                        tableHeaders.map(header => <td className='border text-center' key={header}>{sensorData[header as keyof SensorData]}</td>)
                    }
                </tr>
            </tbody>
        </table>
    )
}