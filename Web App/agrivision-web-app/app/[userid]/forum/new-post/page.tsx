'use client'

import firebaseApp from '@/app/configurations/firebaseConfig'
import { getFirestore, addDoc, collection } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import { Firestore } from 'firebase/firestore'
import Form from '@/app/components/forum/Form'

async function uploadData(db: Firestore, name: string, question: string) {
    try {
    const docRef = await addDoc(collection(db, 'forum'), { author: name, body: question, replies: [] })
    console.log('Document written with ID:', docRef.id);
    } catch (error) {
        console.error('Error adding document:', error);
    }
}

export default function Page({ params }: { params: { userid: string }}) {
    const db = getFirestore(firebaseApp)
    const router = useRouter()
    // const [formData, setFormData] = useState({
    //     name: '',
    //     question: '',
    // })

    function submitHandler(formData) {
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
        // <form onSubmit={submitHandler}>
        //     <label>
        //         Name:
        //         <input
        //             type="text"
        //             name="name"
        //             value={formData.name}
        //             onChange={changeHandler}
        //         ></input>
        //     </label>
        //     <label>
        //         Question:
        //         <input
        //             type="text"
        //             name="question"
        //             value={formData.question}
        //             onChange={changeHandler}
        //         ></input>
        //     </label>
        //     <button type="button" onClick={cancelHandler}>Cancel</button>
        //     <button type="submit">Submit</button>
        // </form>
    )
}
