'use client'
import Image from 'next/image'
import homebackground from '@/public/homebackground.jpg'
import { useState, useEffect } from 'react'
import Status from './components/landing-page/Status'



export function LandingPage({ userid }: { userid: string }) {
    const [data, setData] = useState<{ controlledtime: string; fan: boolean; pump: boolean, boxid: string}[]>([])
    const [loading, setLoading] = useState(false)
    const boxes = ["box1", "box2", "box3"]

    const fetchData = async(boxid: string) => {
        const fetchedData = await fetch(`${process.env.BASE_URL}/api/agribox/control-time/?userid=${userid}&boxid=${boxid}`, {
            method: 'GET',
        })
        const currData = await fetchedData.json()
        return currData.rows;
    }

    useEffect(() => {
        const fetchAllBoxes = async() => {
            setLoading(true)
            const newData: { controlledtime: string; fan: boolean; pump: boolean, boxid: string }[] = [];
            for (const boxid of boxes) {
                const data = await fetchData(boxid)
                if (data) {
                    data.map((item: { controlledtime: string; fan: boolean; pump: boolean}) => {
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
            <div className="flex flex-col items-center justify-between">
                <div className="text-6xl flex flex-col items-center text-white">
                    <p>Welcome to AgriVision</p>
                    <p>{userid} !</p>
                </div>
                <div>
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
