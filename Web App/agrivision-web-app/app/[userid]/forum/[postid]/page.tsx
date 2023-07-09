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
    
    function submitHandler(formData: {name: string, body: string}) {
        if (formData.name.length === 0) {
            console.log("invalid name")
            return;
        }
        if (formData.body.length === 0) {
            console.log("invalid question")
            return;
        }

        async function updateMapField(collectionName: string, documentId: string, fieldName:string, updatedMap: {name: string, body: string}) {
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
                replies.map((reply: {id: string, name: string, body: string, replies: {name: string, body: string}}) => (
                    <div key={reply.id}>
                        <Post userid={params.userid} postid={reply.id} name={reply.name} body={reply.body} />
                        <Reply id={reply.id} replies={reply.replies}></Reply>
                    </div>
                ))}
        </div>
        <Form onSubmit={submitHandler} onCancel={cancelHandler}></Form>
        </>
    )
}
