import firebaseApp from '@/app/configurations/firebaseConfig'
import {
    getFirestore,
    collection,
    getDocs,
    query,
    where,
} from 'firebase/firestore'
import ReplyPage from '@/app/components/forum/ReplyPage'


export default async function Page({ params }: { params: { postid: string; userid: string } }) {
    const getData = async () => {
        const db = getFirestore(firebaseApp)
        const q = query(collection(db, 'forum'), where('__name__', '==', params.postid))
        const querySnapshot = await getDocs(q)
        const allReplies: any[] = []
        querySnapshot.forEach((doc) => {
            const jsonData = { id: doc.id, ...doc.data() }
            allReplies.push(jsonData)
        })
        return allReplies;
    }
    
    const allReplies = await getData()

    return (
        <ReplyPage allReplies={allReplies} userid = {params.userid} postid = {params.postid} />
    )
}
