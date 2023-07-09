'use client'
import Post from '@/app/components/forum/Post'
import firebaseApp from '@/app/configurations/firebaseConfig'
import { getFirestore, collection, getDocs, doc, query, where, updateDoc, arrayUnion } from 'firebase/firestore'
import { useState, useEffect } from 'react'
import Reply from '@/app/components/forum/Reply'
import Form from '@/app/components/forum/Form'
import { useRouter } from 'next/navigation'

export default function Page({ params }: { params: { postid: string; userid: string } }) {
    const [replies, setReplies] = useState([])
    const db = getFirestore(firebaseApp)
    const router = useRouter();
    
    function submitHandler(formData) {
        if (formData.name.length === 0) {
            console.log("invalid name")
            return;
        }
        if (formData.body.length === 0) {
            console.log("invalid question")
            return;
        }

        async function updateMapField(collectionName, documentId, fieldName, updatedMap) {
            const documentRef = doc(db, collectionName, documentId)
          
            // Update the document with the new map field
            await updateDoc(documentRef, { [fieldName]: arrayUnion(updatedMap) })
          }
        updateMapField('forum', params.postid, 'replies', {'name': formData.name, 'body': formData.body})
        // buffer of 1 sec for data to be uploaded
        setTimeout(() => {
            window.location.reload();
        }, 1000)
    }

    function cancelHandler() {
        router.push(`/${params.userid}/forum`)
    }

    useEffect(() => {
        async function getReplies() {
            const q = query(collection(db, 'forum'), where('__name__', '==', params.postid))
            const querySnapshot = await getDocs(q)
            const curr = []
            querySnapshot.forEach((doc) => {
                const jsonData = { id: doc.id, ...doc.data() }
                curr.push(jsonData)
            })
            setReplies(curr)
        }
        getReplies();
    }, [])

    return (
        <>
        <div>
            {replies.length > 0 &&
                replies.map((reply) => (
                    <>
                        <Post userid={params.userid} postid={reply.id} author={reply.author} body={reply.body} />
                        <Reply id={reply.id} replies={reply.replies}></Reply>
                    </>
                ))}
        </div>
        <Form onSubmit={submitHandler} onCancel={cancelHandler}></Form>
        </>
    )
}
