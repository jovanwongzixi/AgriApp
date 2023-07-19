
import Post from '@/app/components/forum/Post'
import firebaseApp from '@/app/configurations/firebaseConfig'
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import Link from 'next/link'

const getData = async () => {
    const db = getFirestore(firebaseApp)
    const querySnapshot = await getDocs(collection(db, 'forum'))
    const posts = []
    querySnapshot.forEach((doc) => {
        // typescript dosent support spread?
        const jsonData = { id: doc.id, ...doc.data() }
        posts.push(jsonData)
    })
    return posts;
}

export default async function Page({ params }: { params: { posts } }) {
    const posts = await getData();
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
                        <p className="text-white text-center">"There are no posts"</p>
                    </div>
                )}
                {posts.length > 0 &&
                    posts.map(
                        (post: { id: string; userid: string; title: string; body: string }) => (
                            <Post
                                key={post.id}
                                userid={post.userid}
                                postid={post.id}
                                title={post.title}
                                body={post.body}
                            />
                        )
                    )}
            </div>
        </div>
    )
}
