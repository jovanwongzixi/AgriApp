import firebaseApp from '@/app/configurations/firebaseConfig'
import {
    getFirestore,
    collection,
    getDocs,
    query,
    where,
} from 'firebase/firestore'
import ReplyPage from '@/app/components/forum/ReplyPage'
import { getStorage, ref, getDownloadURL } from 'firebase/storage';


export default async function Page({ params }: { params: { postid: string; } }) {
    const getData = async () => {
        const db = getFirestore(firebaseApp)
        const q = query(collection(db, 'forum'), where('__name__', '==', params.postid))
        const querySnapshot = await getDocs(q)
        const allReplies: any[] = []
        querySnapshot.forEach((doc) => {
            const jsonData = { ...doc.data() }
            allReplies.push(jsonData)
        })
        return allReplies;
    }

    const getImg = async () => {
        const storage = getStorage(firebaseApp);
        let url;
        try {
            url = await getDownloadURL(ref(storage, `gs://agrivision-da164.appspot.com/forum/${params.postid}`))
            
        } catch (error) {
            url = null
        }
        return url;
    }
    
    const allReplies = await getData()
    const url = await getImg()
    
    return (
        <ReplyPage allReplies={allReplies} postid = {params.postid} url={url} />
    )
}
