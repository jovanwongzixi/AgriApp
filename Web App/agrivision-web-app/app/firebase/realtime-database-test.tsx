'use client'

import { getDatabase, ref, onValue, get, child } from 'firebase/database'
import firebaseApp from '@/app/configurations/firebaseConfig'
import { useEffect } from 'react'
const db = getDatabase(firebaseApp)
const dbRef = ref(db)

export default function realtimeDbTest() {
    useEffect(() => {
        get(child(dbRef, 'test/'))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    console.log(snapshot.val())
                } else console.log('not found')
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])
    return <h1>Realtime database test working</h1>
}
