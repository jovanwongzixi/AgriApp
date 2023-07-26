import { getDownloadURL, getStorage, ref } from 'firebase/storage'
import firebaseApp from '@/app/configurations/firebaseConfig'

const storage = getStorage(firebaseApp)
const storageRef = ref(storage, `gs://${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/readings/box1_readings.csv`)

export default async function DownloadLink(){
    const fileURL = await getDownloadURL(storageRef)
    return(
        <a 
            className='border rounded-2xl bg-white hover:bg-[#D9D9D9] text-black text-center max-h-fit p-2' 
            download 
            href={fileURL}
        >Download Historical Data</a>
    )
}