'use client'

import { useContext, createContext, useState, useEffect } from 'react'
import { onAuthStateChanged, getAuth, User } from 'firebase/auth'
import firebaseApp from '@/configurations/firebaseConfig'

export const auth = getAuth(firebaseApp)

export const AuthContext = createContext<User | null>(null)

export const useAuthContext = () => useContext(AuthContext)

export default function AuthContextProvider({ children }: { children: React.ReactNode }) {
    const [user, setCurrentUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
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
