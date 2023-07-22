import Post from '@/app/components/forum/Post'
import firebaseApp from '@/app/configurations/firebaseConfig'
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import Link from 'next/link'
import PostPage from '@/app/components/forum/PostPage'

const getData = async () => {
    const db = getFirestore(firebaseApp)
    const querySnapshot = await getDocs(collection(db, 'forum'))
    const posts: any[] = []
    querySnapshot.forEach((doc) => {
        const jsonData = { postid: doc.id, ...doc.data() }
        posts.push(jsonData)
    })
    return posts
}

export default async function Page({ params }: { params: { userid: string } }) {
    const posts = await getData()
    return <PostPage posts={posts} userid={params.userid} />
}
