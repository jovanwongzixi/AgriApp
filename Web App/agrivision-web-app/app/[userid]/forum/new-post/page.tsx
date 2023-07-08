'use client'

import firebaseApp from '@/app/configurations/firebaseConfig'
import { getFirestore, addDoc, collection } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Firestore } from 'firebase/firestore'

async function uploadData(db: Firestore, name: string, question: string) {
    try {
    const docRef = await addDoc(collection(db, 'forum'), { author: name, body: question })
    console.log('Document written with ID:', docRef.id);
    } catch (error) {
        console.error('Error adding document:', error);
    }
}

export default function Page({ params }: { params: { userid: string }}) {
    const db = getFirestore(firebaseApp)
    const router = useRouter()
    const [formData, setFormData] = useState({
        // Initialize form data fields
        name: '',
        question: '',
    })

    function submitHandler(event) {
        event?.preventDefault()
        if (formData.name.length === 0) {
            console.log("invalid name")
            return;
        }
        if (formData.question.length === 0) {
            console.log("invalid question")
            return;
        }
        uploadData(db, formData.name, formData.question)
        router.push(`/${params.userid}/forum`)
    }

    function cancelHandler() {
        router.push(`/${params.userid}/forum`)
    }

    function changeHandler(event) {
        const { name, value } = event.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    return (
        <form onSubmit={submitHandler}>
            <label>
                Name:
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={changeHandler}
                ></input>
            </label>
            <label>
                Question:
                <input
                    type="text"
                    name="question"
                    value={formData.question}
                    onChange={changeHandler}
                ></input>
            </label>
            <button type="button" onClick={cancelHandler}>Cancel</button>
            <button type="submit">Submit</button>
        </form>
    )
}
