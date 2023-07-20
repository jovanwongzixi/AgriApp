'use client'
import Reply from "./Reply";
import ReplyForm from "./ReplyForm";
import {useState, useEffect } from "react";
import { getFirestore } from "firebase/firestore";
import firebaseApp from "@/app/configurations/firebaseConfig";
import { getDocs, collection, query, where, doc, updateDoc, arrayRemove} from "firebase/firestore";
import ReplyOriginalPost from "./ReplyOriginalPost";


const ReplyPage: React.FC<{
    allReplies: {id: string, title: string, body: string, replies: { userid: string; body: string }[]}[], 
    userid: string, postid: string
}> = (props) => {
    const db = getFirestore(firebaseApp)
    const [allReplies, setAllReplies] = useState(props.allReplies)
    const [refresh, setRefresh] = useState(false)


    useEffect(() => {
        const getData = async () => {
            const q = query(collection(db, 'forum'), where('__name__', '==', props.postid))
            const querySnapshot = await getDocs(q)
            const allReplies: any[] = []
            querySnapshot.forEach((doc) => {
                const jsonData = { id: doc.id, ...doc.data() }
            allReplies.push(jsonData)
        })
            setAllReplies(allReplies)
        }
        getData()
    }, [refresh])

    const deleteReplyHandler = (userid: string, body: string) => {
        async function updateMapField(
            collectiontitle: string,
            documentId: string,
            fieldtitle: string,
            updatedMap: { userid: string; body: string }
        ) {
            const documentRef = doc(db, collectiontitle, documentId)

            // Update the document with the new map field
            await updateDoc(documentRef, { [fieldtitle]: arrayRemove(updatedMap) })
        }
        
        if (props.userid === userid) {
            updateMapField('forum', props.postid, 'replies', {
                userid: userid,
                body: body
            }).then(() => setRefresh(state => !state))
            
        } else {
            return
        }
    }

    const refreshHandler = () => {
        setRefresh(state => !state)
    }

    return (
        <div className="bg-[#11200E] min-h-screen">
            {allReplies.length > 0 &&
                allReplies.map(
                    (reply: {
                        id: string
                        title: string
                        body: string
                        replies: { userid: string; body: string }[]
                    }) => (
                        <div key={reply.id} className="list-none">
                            <ReplyOriginalPost
                                userid={props.userid}
                                postid={reply.id}
                                title={reply.title}
                                body={reply.body}
                            />
                            {reply.replies.map(
                                (currReply: { userid: string; body: string }, index) => {
                                    return (
                                        <Reply
                                            id={index}
                                            userid={currReply.userid}
                                            body={currReply.body}
                                            deleteHandler={deleteReplyHandler}
                                        ></Reply>
                                    )
                                }
                            )}
                        </div>
                    )
                )}

            <ReplyForm userid={props.userid} postid = {props.postid} toRefresh = {refreshHandler}></ReplyForm>
        </div>
    )
}

export default ReplyPage;