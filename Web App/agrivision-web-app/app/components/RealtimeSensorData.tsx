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

const tableHeaders = ['temperature', 'humidity', 'ec', 'pH'] // not sure why data is received as ph instead of pH when definition is pH
const tableDisplayHeaders = {
    temperature: 'Temperature/°C',
    humidity: 'Humidity',
    ec: 'EC',
    pH: 'pH'
}

export default function RealtimeSensorData({ sensorData } : { sensorData: SensorData }){
    console.log('From Realtime sensordata component')
    console.log(sensorData)
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