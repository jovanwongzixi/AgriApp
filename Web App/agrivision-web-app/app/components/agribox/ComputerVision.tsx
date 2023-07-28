'use client'

import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import { getDocs, getFirestore, orderBy, query, collection, documentId, limit } from 'firebase/firestore'
import firebaseApp from '@/app/configurations/firebaseConfig'
import { useEffect, useState } from 'react'
import Image from 'next/image'

const firestore = getFirestore(firebaseApp)
const storage = getStorage(firebaseApp)
// const storageRef = ref(storage)

type CVData = {
    area: number,
    breadth: number,
    height: number,
}

function ImageSkeleton(){
    return <div className='h-[200px] min-w-[50%] animate-pulse bg-[#1C2E18] mr-1'/>
}

function DataSkeleton(){
    return(
        <>
            <p className='h-4 w-36 rounded-full animate-pulse bg-[#1C2E18] mt-2' />
            <p className='h-4 w-36 rounded-full animate-pulse bg-[#1C2E18] mt-2' />
            <p className='h-4 w-36 rounded-full animate-pulse bg-[#1C2E18] mt-2' />
        </>
    )
}
export default function ComputerVision(){
    const [cvData, setCvData] = useState<CVData>()
    const [cvPic, setCvPic] = useState<string>()
    const [boxPic, setBoxPic] = useState<string>()

    useEffect(() => {
        async function retrieveCVData(){
            const q = query(collection(firestore, 'cv'), orderBy('cv_url', 'desc'), limit(1))
            const result = await getDocs(q)
            const docid = result.docs.at(0)?.id
            console.log(result.docs.at(0)?.data())
            setCvData({
                area: result.docs.at(0)?.data().Area,
                breadth: result.docs.at(0)?.data().Breadth,
                height: result.docs.at(0)?.data().Height
            })
            const storageRefPic = ref(storage, `gs://agrivision-da164.appspot.com/${docid}`)
            const storageRefCV = ref(storage, `gs://agrivision-da164.appspot.com/cv/${docid}`)
            const [pic, cv] = await Promise.all([getDownloadURL(storageRefPic), getDownloadURL(storageRefCV)])
            setCvPic(cv)
            setBoxPic(pic)
            // document.getElementById('cv-pic')?.setAttribute('src', cv)
            // document.getElementById('box-pic')?.setAttribute('src', pic)
        }
        retrieveCVData()
    }, [])
    return(
        <div className='h-full w-full flex flex-col justify-center content-center'>
            <p>Computer Vision Image and Stats</p>
            <div className='flex flex-row justify-evenly my-2 w-full'>
                {/* {cvPic ? <img id='cv-pic' className='h-full max-w-[50%] block mr-1' src={cvPic}/> : <ImageSkeleton />}
                {boxPic ? <img id='box-pic' className='h-full max-w-[50%] block mr-1' src={boxPic}/>: <ImageSkeleton />} */}
                {cvPic ? <Image alt='cv picture' src={cvPic} height={250} width={300} className='h-full w-[50%] block mr-1'/> : <ImageSkeleton />}
                {boxPic ? <Image alt='box picture' src={boxPic} height={250} width={300} className='h-full w-[50%] block mr-1'/>: <ImageSkeleton />}
            </div>
            {
                cvData !== undefined ? (
                    <>
                        <p>Area: {cvData.area?.toFixed(2)} cm<sup>2</sup></p>
                        <p>Breadth: {cvData.breadth?.toFixed(2)} cm</p>
                        <p>Height: {cvData.height?.toFixed(2)} cm</p>
                    </>
                ) : <DataSkeleton />
            }
        </div>
    )
}