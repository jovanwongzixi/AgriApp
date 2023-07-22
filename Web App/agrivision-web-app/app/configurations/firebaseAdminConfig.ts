import { initializeApp, getApps, cert } from 'firebase-admin/app'

const firebaseAdminConfig = {
    credential:cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    })
    // credential:cert(process.env.FIREBASE_ADMIN_SECRET_KEY!)
}

let firebaseAdminApp = getApps().length === 0 ? initializeApp(firebaseAdminConfig) : getApps()[0]
export default firebaseAdminApp
// export function initAdminApp(){
//     if(getApps().length <= 0){
//         initializeApp(firebaseAdminConfig)
//     }
// }

