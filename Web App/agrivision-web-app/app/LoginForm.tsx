'use client'
import { getDatabase, ref, onValue, get, child } from "firebase/database"
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage'
import firebaseApp from "@/configurations/firebaseConfig"
import { BaseSyntheticEvent, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import signIn from "./auth/signin"

const db = getDatabase(firebaseApp)
const dbRef = ref(db)

const storage = getStorage(firebaseApp)
const storeRef = storageRef(storage, 'gs://agrivision-da164.appspot.com/230615_2134_3.jpg')

export default function LoginForm(){

    const router = useRouter()

    const [ formInput, useFormInput ] = useState({
        username: '',
        password: ''
    })

    const onFormInputChange = (e: BaseSyntheticEvent) => {
        const { name, value } = e.target
        console.log(value)
        useFormInput(prevInput => {
            return {
                ...prevInput,
                [name]: value
            }
        })
    }

    const handleFormSubmit = async (e: BaseSyntheticEvent) => {
        e.preventDefault()

        const { result, error } = await signIn(formInput.username, formInput.password)

        console.log(result)
        if(result) router.push('/admin')
    }
    // const [ submitted, use]

    useEffect(() => {
        get(child(dbRef, 'test/')).then(snapshot => {
            if(snapshot.exists()){
                console.log(snapshot.val())
            }
            else console.log('not found')
        }).catch(error => {
            console.error(error)
        })

        getDownloadURL(storeRef)
            .then(url => {
                const img = document.getElementById('downloadedImage')
                img?.setAttribute('src', url)
            })
    }, [])

    return(
        <form onSubmit={handleFormSubmit}>
            <input
                required
                type="email"
                name="username"
                onChange={onFormInputChange}
            />
            <input
                required
                type="password"
                name="password"
                onChange={onFormInputChange}
            />
            <button>Submit</button>
            <img placeholder="test image" id="downloadedImage" />
        </form>
    )
}