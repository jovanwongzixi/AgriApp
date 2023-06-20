'use client'
import { getDatabase, ref, onValue, get, child } from "firebase/database"
import firebaseApp from "@/configurations/firebaseConfig"
import { BaseSyntheticEvent, useState, useEffect } from "react"
import signIn from "./auth/signin"

const db = getDatabase(firebaseApp)
const dbRef = ref(db)

export default function LoginForm(){
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
        </form>
    )
}