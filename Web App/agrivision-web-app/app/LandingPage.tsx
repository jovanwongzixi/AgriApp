'use client'
import Image from 'next/image'
import homebackground from '@/public/homebackground.jpg'
import { useState, useEffect } from 'react'
import Status from './components/landing-page/Status'

type LastControlledDataIndivBox = {
    controlledtime: string,
    fan: boolean,
    pump: boolean,
}

type LastControlledDataAllBoxes = LastControlledDataIndivBox & {
    boxid: string,
}

const fetchData = async(boxid: string) => {
    const fetchedData = await fetch(`${process.env.BASE_URL}/api/agribox/control-time/?boxid=${boxid}`, {
        method: 'GET',
    })
    const currData = await fetchedData.json()
    return currData.rows;
}


export function LandingPage({ userid }: { userid: string }) {
    const [data, setData] = useState<LastControlledDataAllBoxes[]>([])
    const [loading, setLoading] = useState(false)
    // const boxes = ["box1", "box2", "box3"]
    const boxes = ["box1"]

    useEffect(() => {
        const fetchAllBoxes = async() => {
            setLoading(true)
            const newData: LastControlledDataAllBoxes[] = [];
            for (const boxid of boxes) {
                const data = await fetchData(boxid)
                if (data) {
                    data.map((item: LastControlledDataIndivBox) => {
                        newData.push({...item, boxid})
                    })
                }
            }
            setData(newData)
            setLoading(false)
        }
    fetchAllBoxes()
        
    }, [])

    return (
        <>
            <div className="z-[-2] fixed w-screen h-full">
                <Image src={homebackground} alt="background image" fill />
            </div>
            <div
                className="z-[-1] fixed w-screen h-full"
                style={{
                    background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))',
                }}
            />
            <div className="flex flex-col items-center">
                <div className="text-6xl flex flex-col items-center text-white mt-32 ">
                    <p>Welcome to AgriVision</p>
                    <p>{userid} !</p>
                </div>
                <div className='mt-20'>
                    {loading ? (
                        <h1>Loading data...</h1>
                    ) : (
                        <div>
                            {data?.map((row) => (
                                <Status
                                    key={row.controlledtime}
                                    boxid={row.boxid}
                                    controlledtime={row.controlledtime}
                                    fan={row.fan}
                                    pump={row.pump}
                                ></Status>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
