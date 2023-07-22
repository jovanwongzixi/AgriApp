'use client'
import Reply from "./Reply";
import ReplyForm from "./ReplyForm";
import {useState, useEffect } from "react";
import { getFirestore } from "firebase/firestore";
import firebaseApp from "@/app/configurations/firebaseConfig";
import { getDocs, collection, query, where, doc, updateDoc, arrayRemove} from "firebase/firestore";
import ReplyOriginalPost from "./ReplyOriginalPost";
import { useAuthContext } from "@/app/context/auth-provider";
import { convertEmailToUserid } from "@/app/helper/functions";


const ReplyPage: React.FC<{
    allReplies: {title: string, body: string, userid: string, replies: { userid: string; body: string }[]}[], 
    postid: string, url: any
}> = (props) => {
    const db = getFirestore(firebaseApp)
    const [allReplies, setAllReplies] = useState(props.allReplies)
    const [refresh, setRefresh] = useState(false)
    const { user } = useAuthContext()
    const userid = convertEmailToUserid(user?.email)


    useEffect(() => {
        const getData = async () => {
            const q = query(collection(db, 'forum'), where('__name__', '==', props.postid))
            const querySnapshot = await getDocs(q)
            const allReplies: any[] = []
            querySnapshot.forEach((doc) => {
                const jsonData = { ...doc.data() }
            allReplies.push(jsonData)
        })
            setAllReplies(allReplies)
        }
        getData()
    }, [refresh])

    const deleteReplyHandler = (replyUserid: string, body: string) => {
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
        
        if (userid === replyUserid) {
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
                        title: string
                        body: string
                        userid: string
                        replies: { userid: string; body: string }[]
                    }) => (
                        <div key={props.postid} className="list-none">
                            <ReplyOriginalPost
                                userid={reply.userid}
                                title={reply.title}
                                body={reply.body}
                                url={props.url}
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

            <ReplyForm userid={userid} postid = {props.postid} toRefresh = {refreshHandler}></ReplyForm>
        </div>
    )
}

export default ReplyPage;