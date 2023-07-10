'use client'

import firebaseApp from '@/app/configurations/firebaseConfig'
import { getFirestore, addDoc, collection } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import { Firestore } from 'firebase/firestore'
import Form from '@/app/components/forum/Form'

async function uploadData(db: Firestore, name: string, question: string) {
    try {
    const docRef = await addDoc(collection(db, 'forum'), { name: name, body: question, replies: [] })
    console.log('Document written with ID:', docRef.id);
    } catch (error) {
        console.error('Error adding document:', error);
    }
}

export default function Page({ params }: { params: { userid: string }}) {
    const db = getFirestore(firebaseApp)
    const router = useRouter()

    function submitHandler(formData: {name: string, body: string}) {
        if (formData.name.length === 0) {
            console.log("invalid name")
            return;
        }
        if (formData.body.length === 0) {
            console.log("invalid question")
            return;
        }
        uploadData(db, formData.name, formData.body)
        router.push(`/${params.userid}/forum`)
    }

    function cancelHandler() {
        router.push(`/${params.userid}/forum`)
    }


    return (
        <Form onSubmit={submitHandler} onCancel={cancelHandler} ></Form>
        
    )
}
