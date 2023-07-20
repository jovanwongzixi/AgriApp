'use client'
import { useState } from 'react'
import firebaseApp from '@/app/configurations/firebaseConfig'
import { getFirestore, addDoc, collection } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import { Firestore } from 'firebase/firestore'

async function uploadData(db: Firestore, userid: string, title: string, question: string) {
    try {
        const docRef = await addDoc(collection(db, 'forum'), {
            userid: userid,
            title: title,
            body: question,
            replies: [],
        })
        console.log('Document written with ID:', docRef.id)
        window.location.href = `/${userid}/forum`;
    } catch (error) {
        console.error('Error adding document:', error)
    }
}

const PostForm: React.FC<{
    userid: string
}> = (props) => {
    const [formData, setFormData] = useState({
        title: '',
        body: '',
    })
    const db = getFirestore(firebaseApp)
    const router = useRouter()

    function submitHandler(event) {
        event?.preventDefault();
        if (formData.title.length === 0) {
            console.log('invalid title')
            return
        }
        if (formData.body.length === 0) {
            console.log('invalid question')
            return
        }
        uploadData(db, props.userid, formData.title, formData.body)
        // .then(() => {
        //     router.push(`/${params.userid}/forum`)
    }

    function changeHandler(event) {
        const { title, value } = event.target
        setFormData((prevData) => ({
            ...prevData,
            [title]: value,
        }))
    }

    function cancelHandler() {
        router.push(`/${props.userid}/forum`)
    }

    return (
        <div className="max-w-md mx-auto">
            <form onSubmit={submitHandler}>
                <div className="mb-4">
                    <label className="block text-[#DBDBDB] text-sm font-bold mb-2">Title:</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        title="title"
                        value={formData.title}
                        onChange={changeHandler}
                    ></input>
                </div>
                <div className="mb-4">
                    <label className="block text-[#DBDBDB] text-sm font-bold mb-2">Body:</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        title="body"
                        value={formData.body}
                        onChange={changeHandler}
                    ></input>
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="border border-[#B2B2B2] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:text-[#D9D9D9]"
                        type="button"
                        onClick={cancelHandler}
                    >
                        Cancel
                    </button>
                    <button
                        className="border border-[#B2B2B2] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:text-[#D9D9D9]"
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default PostForm
