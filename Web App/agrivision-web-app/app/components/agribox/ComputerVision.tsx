'use client'

import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import { getDocs, getFirestore, orderBy, query, collection, documentId, limit } from 'firebase/firestore'
import firebaseApp from '@/app/configurations/firebaseConfig'
import { useEffect, useRef, useState } from 'react'

const firestore = getFirestore(firebaseApp)
const storage = getStorage(firebaseApp)
// const storageRef = ref(storage)

type CVData = {
    length: number,
    breadth: number,
    value: number,
}

export default function ComputerVision(){
    const [cvData, setCvData] = useState<CVData>()

    useEffect(() => {
        async function test(){
            const q = query(collection(firestore, 'cv'), orderBy('cv_url', 'desc'), limit(1))
            const result = await getDocs(q)
            const docid = result.docs.at(0)?.id
            setCvData({
                length: result.docs.at(0)?.data().length,
                breadth: result.docs.at(0)?.data().breadth,
                value: result.docs.at(0)?.data().value
            })
            const storageRefPic = ref(storage, `gs://agrivision-da164.appspot.com/${docid}`)
            const storageRefCV = ref(storage, `gs://agrivision-da164.appspot.com/cv/${docid}`)
            const [pic, cv] = await Promise.all([getDownloadURL(storageRefPic), getDownloadURL(storageRefCV)])
            document.getElementById('cv-pic')?.setAttribute('src', cv)
            document.getElementById('box-pic')?.setAttribute('src', pic)
        }
        test()
    }, [])
    return(
        <div className='h-80 w-80'>
            <div className='flex flex-row'>
                <img id='cv-pic' />
                <img id='box-pic' />
            </div>
            {
                cvData && (
                    <>
                        <p>Length: {cvData.length}</p>
                        <p>Breadth: {cvData.breadth}</p>
                        <p>Number of green pixels: {cvData.value}</p>
                    </>
                )
            }
        </div>
    )
}