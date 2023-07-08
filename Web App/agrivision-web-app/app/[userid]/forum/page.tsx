import Post from '@/app/components/forum/Post'
import classes from './page.module.css'
import firebaseApp from '@/app/configurations/firebaseConfig'
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import Link from 'next/link'

export default async function Page() {
    const db = getFirestore(firebaseApp)
    const querySnapshot = await getDocs(collection(db, 'forum'))
    const posts = []
    querySnapshot.forEach((doc) => {
        const jsonData = { id: doc.id, ...doc.data() }
        posts.push(jsonData)
    })

    return (
        <div className={classes.posts}>
          <Link href={`forum/new-post`}>New Post</Link>
            {posts.length === 0 && (
                <div>
                    <p>"There are no posts"</p>
                </div>
            )}
            {posts.length > 0 &&
                posts.map((post) => <Post id={post.id} author={post.author} body={post.body} />)}
        </div>
    )
}
