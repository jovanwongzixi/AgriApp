'use client'
import { BaseSyntheticEvent, useState } from 'react'
import firebaseApp from '@/app/configurations/firebaseConfig'
import { getFirestore, addDoc, collection, } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import { Firestore } from 'firebase/firestore'
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { useAuthContext } from '@/app/context/auth-provider'
import { convertEmailToUserid } from '@/app/helper/functions'

async function uploadData(db: Firestore, userid: string, title: string, question: string, img: any) {
    try {
        const docRef = await addDoc(collection(db, 'forum'), {
            userid: userid,
            title: title,
            body: question,
            replies: [],
        })
        console.log('Document written with ID:', docRef.id)
        
        const storage = getStorage(firebaseApp);
        const storageRef = ref(storage, `gs://agrivision-da164.appspot.com/${docRef.id}`);
        uploadBytes(storageRef, img).then((snapshot) => {
            console.log('Uploaded a blob or file!');
          });
        window.location.href = `/${userid}/forum`;
    } catch (error) {
        console.error('Error adding document:', error)
    }
}
const PostForm: React.FC<{
}> = () => {
    const [formData, setFormData] = useState({
        title: '',
        body: '',
        img: undefined
    })
    const db = getFirestore(firebaseApp)
    const router = useRouter()
    const { user } = useAuthContext()
    const userid = convertEmailToUserid(user?.email)

    function submitHandler(event: BaseSyntheticEvent) {
        event?.preventDefault();
        if (formData.title.length === 0) {
            console.log('invalid title')
            return
        }
        if (formData.body.length === 0) {
            console.log('invalid question')
            return
        }
        uploadData(db, userid, formData.title, formData.body, formData.img)
        // .then(() => {
        //     router.push(`/${params.userid}/forum`)
    }

    function changeHandler(event: BaseSyntheticEvent) {
        const { title, value, files } = event.target;
        
        if (title === 'img' && files && files.length > 0) {
          // Get the first selected file from the files array
          const selectedFile = files[0];
        
          // Convert the selected file to a File object
          const fileObject = new File([selectedFile], selectedFile.name, {
            type: selectedFile.type,
          });
        
          setFormData((prevData) => ({
            ...prevData,
            [title]: fileObject,
          }));
        } else {
          setFormData((prevData) => ({
            ...prevData,
            [title]: value,
          }));
        }
      }

    function cancelHandler() {
        router.push(`/${userid}/forum`)
    }

    return (
        <div className="max-w-md mx-auto">
            <form onSubmit={submitHandler}>
                <div className="mb-4">
                    <label className="block text-[#DBDBDB] text-sm font-bold mb-2">Title:</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        title="title"
                        value={formData.title}
                        onChange={changeHandler}
                    ></input>
                </div>
                <div className="mb-4">
                    <label className="block text-[#DBDBDB] text-sm font-bold mb-2">Body:</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        title="body"
                        value={formData.body}
                        onChange={changeHandler}
                    ></input>
                </div>
                <div className="mb-4">
                    <label className="block text-[#DBDBDB] text-sm font-bold mb-2">Image:</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="file"
                        title="img"
                        onChange={changeHandler}
                    ></input>
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="border border-[#B2B2B2] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:text-[#D9D9D9]"
                        type="button"
                        onClick={cancelHandler}
                    >
                        Cancel
                    </button>
                    <button
                        className="border border-[#B2B2B2] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:text-[#D9D9D9]"
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default PostForm
