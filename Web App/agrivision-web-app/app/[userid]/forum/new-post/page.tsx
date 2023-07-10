'use client'

import firebaseApp from '@/app/configurations/firebaseConfig'
import { getFirestore, addDoc, collection } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import { Firestore } from 'firebase/firestore'
import PostForm from '@/app/components/forum/PostForm'

async function uploadData(db: Firestore, userid: string, title: string, question: string) {
    try {
    const docRef = await addDoc(collection(db, 'forum'), { userid: userid, title: title, body: question, replies: [] })
    console.log('Document written with ID:', docRef.id);
    } catch (error) {
        console.error('Error adding document:', error);
    }
}

export default function Page({ params }: { params: { userid: string }}) {
    const db = getFirestore(firebaseApp)
    const router = useRouter()

    function submitHandler(formData: {title: string, body: string}) {
        if (formData.title.length === 0) {
            console.log("invalid title")
            return;
        }
        if (formData.body.length === 0) {
            console.log("invalid question")
            return;
        }
        uploadData(db, params.userid, formData.title, formData.body)
        router.push(`/${params.userid}/forum`)
    }

    function cancelHandler() {
        router.push(`/${params.userid}/forum`)
    }


    return (
        <PostForm onSubmit={submitHandler} onCancel={cancelHandler} ></PostForm>
    )
}
