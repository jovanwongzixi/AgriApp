'use client'

import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import { getDocs, getFirestore, orderBy, query, collection, documentId, limit } from 'firebase/firestore'
import firebaseApp from '@/app/configurations/firebaseConfig'
import { useEffect, useRef, useState } from 'react'

const firestore = getFirestore(firebaseApp)
const storage = getStorage(firebaseApp)
// const storageRef = ref(storage)

type CVData = {
    area: number,
    breadth: number,
    height: number,
}

export default function ComputerVision(){
    const [cvData, setCvData] = useState<CVData>()

    useEffect(() => {
        async function retrieveCVData(){
            const q = query(collection(firestore, 'cv'), orderBy('cv_url', 'desc'), limit(1))
            const result = await getDocs(q)
            const docid = result.docs.at(0)?.id
            setCvData({
                area: result.docs.at(0)?.data().Area,
                breadth: result.docs.at(0)?.data().Breadth,
                height: result.docs.at(0)?.data().Height
            })
            const storageRefPic = ref(storage, `gs://agrivision-da164.appspot.com/${docid}`)
            const storageRefCV = ref(storage, `gs://agrivision-da164.appspot.com/cv/${docid}`)
            const [pic, cv] = await Promise.all([getDownloadURL(storageRefPic), getDownloadURL(storageRefCV)])
            document.getElementById('cv-pic')?.setAttribute('src', cv)
            document.getElementById('box-pic')?.setAttribute('src', pic)
        }
        retrieveCVData()
    }, [])
    return(
        <div className='h-80 w-80'>
            <div className='flex flex-row justify-evenly'>
                <img id='cv-pic' />
                <img id='box-pic' />
            </div>
            {
                cvData && (
                    <>
                        <p>Area: {cvData.area.toFixed(2)} cm^2</p>
                        <p>Breadth: {cvData.breadth.toFixed(2)} cm</p>
                        <p>Height: {cvData.height.toFixed(2)} cm</p>
                    </>
                )
            }
        </div>
    )
}