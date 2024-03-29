'use client'

import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage'
import firebaseApp from '@/app/configurations/firebaseConfig'
import { useEffect } from 'react'

const storage = getStorage(firebaseApp)
const storeRef = storageRef(storage, 'gs://agrivision-da164.appspot.com/230611_1930.jpg')

export default function storageTest() {
    useEffect(() => {
        getDownloadURL(storeRef).then((url) => {
            const img = document.getElementById('downloadedImage')
            img?.setAttribute('src', url)
        })
    }, [])

    return <img id="downloadedImage" />
}
