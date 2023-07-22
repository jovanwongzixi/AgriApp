import firebaseApp from '@/app/configurations/firebaseConfig'
import { signInWithEmailAndPassword, getAuth, User, UserCredential } from 'firebase/auth'
import { convertEmailToUserid } from '../helper/functions'

const auth = getAuth(firebaseApp)

const signIn = async (email: string, password: string) => {
    let result: UserCredential
    let error = null

    try {
        result = await signInWithEmailAndPassword(auth, email, password)
        if (result) await loginServer(result.user) //handle failure?
        return { result, error } 
    } catch (e) {
        error = e
        console.error(e)
        return { result: null, error }
    }
}

const loginServer = async (user : User | null) => {
    const res = await fetch(`${process.env.BASE_URL}/api/login`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${await user?.getIdToken()}`,
        }
    })
    return res.status;
}
export default signIn
