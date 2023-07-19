'use client'
import firebaseApp from '@/app/configurations/firebaseConfig'
import { getFirestore, doc, updateDoc, arrayUnion } from 'firebase/firestore'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const ReplyForm: React.FC<{
    userid: string
    postid: string
    toRefresh: () => void
}> = (props) => {
    const [formData, setFormData] = useState({
        body: '',
    })
    const db = getFirestore(firebaseApp)
    const router = useRouter()

    function submitHandler(event) {
        event?.preventDefault()
        if (formData.body.length === 0) {
            console.log('invalid reply')
            return
        }

        async function updateMapField(
            collectiontitle: string,
            documentId: string,
            fieldtitle: string,
            updatedMap: { userid: string; body: string }
        ) {
            const documentRef = doc(db, collectiontitle, documentId)

            // Update the document with the new map field
            await updateDoc(documentRef, { [fieldtitle]: arrayUnion(updatedMap) })
        }
        updateMapField('forum', props.postid, 'replies', {
            userid: props.userid,
            body: formData.body,
        })
        setFormData({body: ''})

        props.toRefresh()
    }

    function cancelHandler() {
        router.push(`/${props.userid}/forum`)
    }

    function changeHandler(event) {
        const { title, value } = event.target
        setFormData((prevData) => ({
            ...prevData,
            [title]: value,
        }))
    }

    return (
        <div className="border-t mt-4 pt-4">
            <div className="flex items-start space-x-4">
                <div className="flex-grow">
                    <form onSubmit={submitHandler}>
                        <textarea
                            className="shadow appearance-none border border-[#B2B2B2] rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                            rows={3}
                            placeholder="Reply..."
                            title="body"
                            value={formData.body}
                            onChange={changeHandler}
                        />
                        <div className="flex justify-end space-x-2 mt-2 mx-2">
                            <button
                                className="border border-[#B2B2B2] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:text-[#D9D9D9] "
                                type="button"
                                onClick={cancelHandler}
                            >
                                Cancel
                            </button>
                            <button
                                className="border border-[#B2B2B2] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:text-[#D9D9D9]"
                                type="submit" 
                            >
                                Reply
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ReplyForm
