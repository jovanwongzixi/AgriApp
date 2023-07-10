'use client'
import Post from '@/app/components/forum/Post'
import firebaseApp from '@/app/configurations/firebaseConfig'
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Page({ params }: { params : { userid: string}}) {
    const [posts, setPosts] = useState([])
    const db = getFirestore(firebaseApp)
    useEffect(() => {
        async function getData() {
            const querySnapshot = await getDocs(collection(db, 'forum'))
            const curr = []
            querySnapshot.forEach((doc) => {
                // typescript dosent support spread?
                const jsonData = { id: doc.id, ...doc.data() }
                curr.push(jsonData)
            })
            setPosts(curr)
        }
        getData();
    }, [])

    return (
        <div className='bg-green-400 min-h-screen'>
        <div className="relative list-none max-w-2xl mx-auto my-4 p-4 grid grid-cols-3 gap-4 justify-center ">
            <Link className='absolute top-0 right-0' href={`forum/new-post`}>New Post</Link>
            {posts.length === 0 && (
                <div>
                    <p>"There are no posts"</p>
                </div>
            )}
            {posts.length > 0 &&
                posts.map((post: {id: string, userid: string, title: string, body: string}) => <Post key={post.id} userid = {post.userid} postid={post.id} title={post.title} body={post.body} />)}
        </div>
        </div>
    )
}
