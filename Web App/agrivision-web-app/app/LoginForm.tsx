'use client'

import { getDatabase, ref, onValue, get, child } from 'firebase/database'
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage'
import firebaseApp from '@/configurations/firebaseConfig'
import { BaseSyntheticEvent, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import signIn from './auth/signin'
// import firebaseAdminApp from '@/configurations/firebaseAdminConfig'
// console.log(firebaseAdminApp)
// const db = getDatabase(firebaseApp)
// const dbRef = ref(db)

// const storage = getStorage(firebaseApp)
// const storeRef = storageRef(storage, 'gs://agrivision-da164.appspot.com/230615_2134_3.jpg')

export default function LoginForm() {
    const router = useRouter()

    const [formInput, useFormInput] = useState({
        username: '',
        password: '',
    })

    const onFormInputChange = (e: BaseSyntheticEvent) => {
        const { name, value } = e.target
        // console.log(value)
        useFormInput((prevInput) => {
            return {
                ...prevInput,
                [name]: value,
            }
        })
    }

    const handleFormSubmit = async (e: BaseSyntheticEvent) => {
        e.preventDefault()

        const { result, error } = await signIn(formInput.username, formInput.password)

        console.log(result)
        // if (result) router.push('/admin')
        if (result) router.push(`/${result.user.email?.split('@')[0]}`)
    }

    useEffect(() => {
        // get(child(dbRef, 'test/'))
        //     .then((snapshot) => {
        //         if (snapshot.exists()) {
        //             console.log(snapshot.val())
        //         } else console.log('not found')
        //     })
        //     .catch((error) => {
        //         console.error(error)
        //     })

        // getDownloadURL(storeRef).then((url) => {
        //     const img = document.getElementById('downloadedImage')
        //     img?.setAttribute('src', url)
        // })
    }, [])

    return (
        <>
            {/* <div
                className='
                pt-24
                grid 
                grid-cols-1 
                sm:grid-cols-2 
                md:grid-cols-3 
                lg:grid-cols-4
                xl:grid-cols-5
                2xl:grid-cols-6
                gap-8' 
            /> */}
            <form onSubmit={handleFormSubmit}>
                <input
                    required 
                    className='border-blue-500 border mr-2' 
                    // autoComplete='off'
                    type="email" 
                    name="username" 
                    onChange={onFormInputChange} 
                />
                <input 
                    required 
                    className='border-blue-500 border mr-2' 
                    type="password" 
                    name="password" 
                    onChange={onFormInputChange} 
                />
                <button className='border-blue-500 border'>Submit</button>
                {/* <img alt="test image" id="downloadedImage" /> */}
            </form>
        </>
    )
}
