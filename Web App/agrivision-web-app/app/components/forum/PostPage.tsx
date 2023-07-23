'use client'
import { useState, useEffect } from 'react'
import { deleteDoc, doc, getDocs, collection } from 'firebase/firestore'
import { getFirestore } from 'firebase/firestore'
import firebaseApp from '@/app/configurations/firebaseConfig'
import Post from './Post'
import Link from 'next/link'
import { deleteObject, ref, getStorage } from 'firebase/storage'
import { useAuthContext } from '@/app/context/auth-provider'
import { convertEmailToUserid } from '@/app/helper/functions'

const PostPage: React.FC<{
    posts: {
        postid: string
        userid: string
        title: string
        body: string
        replies: { userid: string; body: string }[]
    }[]
}> = (props) => {
    const [posts, setPosts] = useState(props.posts)
    const [refresh, setRefresh] = useState(false)
    const db = getFirestore(firebaseApp)
    const storage = getStorage(firebaseApp)
    const { user } = useAuthContext()
    const userid = convertEmailToUserid(user?.email)
    useEffect(() => {
        const refreshHandler = async () => {
            const db = getFirestore(firebaseApp)
            const querySnapshot = await getDocs(collection(db, 'forum'))
            const posts: any[] = []
            querySnapshot.forEach((doc) => {
                const jsonData = { postid: doc.id, ...doc.data() }
                posts.push(jsonData)
            })
            setPosts(posts)
        }
        refreshHandler()
    }, [refresh])

    const deletePostHandler = (postUserid: string, postid: string) => {
        if (userid === postUserid) {
            deleteDoc(doc(db, 'forum', postid)).then(() => {
                deleteObject(ref(storage, `gs://agrivision-da164.appspot.com/${postid}`))
                .then(
                    () => {
                        setRefresh((state) => !state)
                    }
                ).catch(error => {
                    console.log("no image")
                    setRefresh((state) => !state)})
            })
        } else {
            return
        }
    }

    return (
        <div className=" relative bg-[#11200E] min-h-screen">
            <div className=" list-none max-w-2xl mx-auto p-4 grid grid-cols-3 gap-4 justify-center ">
                <Link
                    className="absolute top-0 right-0 text-white border border-[#B2B2B2] hover:text-[#D9D9D9] font-bold py-2  px-4 rounded focus:outline-none focus:shadow-outline w-28"
                    href={`forum/new-post`}
                >
                    New Post
                </Link>
                {posts.length === 0 && (
                    <div>
                        <p className="text-white text-center">There are no posts.</p>
                    </div>
                )}
                {posts.length > 0 &&
                    posts.map(
                        (post: {
                            postid: string
                            userid: string
                            title: string
                            body: string
                            replies: { userid: string; body: string }[]
                        }) => (
                            <Post
                                key={post.postid}
                                userid={post.userid}
                                postid={post.postid}
                                title={post.title}
                                body={post.body}
                                deleteHandler={deletePostHandler}
                            />
                        )
                    )}
            </div>
        </div>
    )
}

export default PostPage
