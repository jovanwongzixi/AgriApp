import fs from 'fs'
import { stringify } from 'csv-stringify'
import { getFirestore } from 'firebase-admin/firestore'
import { getStorage } from 'firebase-admin/storage'
import firebaseApp from './configurations/firebaseConfig.js'

const db = getFirestore(firebaseApp)
const storage = getStorage(firebaseApp)

const box1_readings = await db.collection('box1').orderBy('timestamp', 'desc').get()

const writableStream = fs.createWriteStream('box1_readings.csv')

const columns = [
    "ph",
    "temperature",
    "humidity",
    "ec",
    "timestamp",
]

const stringifier = stringify({ header: true, columns: columns })

box1_readings.forEach(doc => {
    stringifier.write({
        ...doc.data(),
        timestamp: doc.data().timestamp.toDate().toString()
    })
})

stringifier.pipe(writableStream)
console.log('CSV file written successfully')

await storage.bucket().upload('./box1_readings.csv', {
    destination: 'readings/box1_readings.csv',
    contentType: 'text/csv',
})

console.log('Uploaded to Firebase Storage successfully')