'use client'

import { useContext, createContext, useState, useEffect } from 'react'
import { onAuthStateChanged, getAuth, User } from 'firebase/auth'
import firebaseApp from '@/configurations/firebaseConfig'

export const auth = getAuth(firebaseApp)

export const AuthContext = createContext({})

export const useAuthContext = () => useContext(AuthContext)

export default function AuthContextProvider({
    children
} : {
    children: React.ReactNode
}) {
    const [user, setUser] = useState<User | null>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user)
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    return (
        <AuthContext.Provider value={{ user }}>
            {loading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    )
}