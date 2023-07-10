'use client'
import Post from '@/app/components/forum/Post'
import firebaseApp from '@/app/configurations/firebaseConfig'
import { getFirestore, collection, getDocs, doc, query, where, updateDoc, arrayUnion } from 'firebase/firestore'
import { useState, useEffect } from 'react'
import Reply from '@/app/components/forum/Reply'
import ReplyForm from '@/app/components/forum/ReplyForm'
import { useRouter } from 'next/navigation'

export default function Page({ params }: { params: { postid: string; userid: string } }) {
    const [allReplies, setAllReplies] = useState([])
    const db = getFirestore(firebaseApp)
    const router = useRouter();
    
    function submitHandler(formData: {body: string}) {
        if (formData.body.length === 0) {
            console.log("invalid reply")
            return;
        }

        async function updateMapField(collectiontitle: string, documentId: string, fieldtitle:string, updatedMap: {userid: string, body: string}) {
            const documentRef = doc(db, collectiontitle, documentId)
          
            // Update the document with the new map field
            await updateDoc(documentRef, { [fieldtitle]: arrayUnion(updatedMap) })
          }
        updateMapField('forum', params.postid, 'replies', {'userid': params.userid, 'body': formData.body})
        // buffer of 1 sec for data to be uploaded
        setTimeout(() => {
            window.location.reload();
        }, 1500)
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
            setAllReplies(curr)
        }
        getReplies();
    }, [])

    return (
        <>
        <div>
            {allReplies.length > 0 &&
                allReplies.map((reply: {id: string, title: string, body: string, replies: {userid: string, body: string}[]}) => (
                    <div key={reply.id}>
                        <Post userid={params.userid} postid={reply.id} title={reply.title} body={reply.body} />
                        {reply.replies.map((currReply: {userid: string, body: string}, index) => {
                            return <Reply id={index} userid={currReply.userid} body={currReply.body}></Reply>
                        })}
                    </div>
                ))}
        </div>
        <ReplyForm onSubmit={submitHandler} onCancel={cancelHandler}></ReplyForm>
        </>
    )
}
