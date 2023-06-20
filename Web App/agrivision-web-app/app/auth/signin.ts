import firebaseApp from '@/configurations/firebaseConfig'
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth'

const auth = getAuth(firebaseApp)

const signIn = async (email: string, password: string) => {
    let result = null
    let error = null
    try {
        result = await signInWithEmailAndPassword(auth, email, password)
    } catch (e) {
        error = e
    }
    return { result, error }
}

export default signIn