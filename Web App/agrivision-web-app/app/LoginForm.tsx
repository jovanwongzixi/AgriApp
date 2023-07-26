'use client'
// import storageTest from './firebase/storage-test'
import { getDatabase, ref, onValue, get, child } from 'firebase/database'
import firebaseApp from '@/app/configurations/firebaseConfig'
import { BaseSyntheticEvent, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import signIn from './auth/signin'
import { convertEmailToUserid } from './helper/functions'
import loginbackground from '@/public/loginpage.jpg'
import Image from 'next/image'
// import firebaseAdminApp from '@/configurations/firebaseAdminConfig'
// console.log(firebaseAdminApp)
const db = getDatabase(firebaseApp)
const dbRef = ref(db)

// const storage = getStorage(firebaseApp)
// const storeRef = storageRef(storage, 'gs://agrivision-da164.appspot.com/230627_1950_2.jpg')

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
        if (result) router.push('/')
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
        <div className="flex h-screen">
            <div className="flex-1 bg-gray-200">
                <Image src={loginbackground} alt="Image" className="object-cover w-full h-full" />
            </div>
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

            <div className="flex-1 bg-[#11200E] p-8 flex items-center justify-center relative ">
                <div className="flex flex-col mb-4 mt-8">
                    <div className='text-5xl absolute top-8 text-center'>Welcome to AgriVision!</div>
                    <form onSubmit={handleFormSubmit}>
                        <input
                            required
                            className="shadow appearance-none border border-[#B2B2B2] rounded w-full py-2 px-4 text-black leading-tight focus:outline-none focus:shadow-outline my-2 "
                            // autoComplete='off'
                            type="email"
                            name="username"
                            placeholder="Email"
                            onChange={onFormInputChange}
                        />
                        <input
                            required
                            className="shadow appearance-none border border-[#B2B2B2] rounded w-full py-2 px-4 text-black leading-tight focus:outline-none focus:shadow-outline my-2 "
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={onFormInputChange}
                        />
                        <button className="w-full px-4 py-2 border my-2 border border-[#B2B2B2] text-white font-bold rounded-md hover:text-[#D9D9D9] ">
                            Log In
                        </button>

                        {/* <img alt="test image" id="downloadedImage" /> */}
                    </form>
                </div>
            </div>
        </div>
    )
}
