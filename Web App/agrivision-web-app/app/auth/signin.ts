import firebaseApp from '@/configurations/firebaseConfig'
import { signInWithEmailAndPassword, getAuth, User } from 'firebase/auth'
import { convertEmailToUserid } from '../helper/functions'

const auth = getAuth(firebaseApp)

const signIn = async (email: string, password: string) => {
    let result = null
    let error = null

    try {
        result = await signInWithEmailAndPassword(auth, email, password)
        if (result) await loginServer(result.user) //handle failure?
    } catch (e) {
        error = e
        console.error(e)
    }
    return { result, error }
}

const loginServer = async (user : User | null) => {
    const res = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${await user?.getIdToken()} ${convertEmailToUserid(user?.email)}`,
        }
    })
    return res.status;
}
export default signIn
