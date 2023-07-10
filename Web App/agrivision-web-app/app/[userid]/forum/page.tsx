'use client'
import Post from '@/app/components/forum/Post'
import classes from './page.module.css'
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
        <div className={classes.posts}>
            <Link href={`forum/new-post`}>New Post</Link>
            {posts.length === 0 && (
                <div>
                    <p>"There are no posts"</p>
                </div>
            )}
            {posts.length > 0 &&
                posts.map((post: {id: string, userid: string, title: string, body: string}) => <Post key={post.id} userid = {post.userid} postid={post.id} title={post.title} body={post.body} />)}
        </div>
    )
}
