import { initializeApp, cert } from 'firebase-admin/app'
import dotenv from 'dotenv'
dotenv.config()

const firebaseApp = initializeApp({
    credential: cert(process.env.FIREBASE_ADMIN_SERVICE_KEY),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
})

export default firebaseApp