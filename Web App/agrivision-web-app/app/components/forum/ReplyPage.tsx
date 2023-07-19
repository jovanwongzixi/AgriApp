'use client'
import Post from "./Post";
import Reply from "./Reply";
import ReplyForm from "./ReplyForm";
import {useState } from "react";
import { getFirestore } from "firebase/firestore";
import firebaseApp from "@/app/configurations/firebaseConfig";
import { getDocs, collection, query, where } from "firebase/firestore";


const ReplyPage: React.FC<{
    allReplies: {id: string, title: string, body: string, replies: { userid: string; body: string }[]}[], 
    userid: string, postid: string
}> = (props) => {
    
    const [allReplies, setAllReplies] = useState(props.allReplies)


    const refreshHandler = () => {
        const getData = async () => {
            const db = getFirestore(firebaseApp)
            const q = query(collection(db, 'forum'), where('__name__', '==', props.postid))
            const querySnapshot = await getDocs(q)
            const allReplies = []
            querySnapshot.forEach((doc) => {
                const jsonData = { id: doc.id, ...doc.data() }
            allReplies.push(jsonData)
        })
            setAllReplies(allReplies)
        }
        getData()
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
                            <Post
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