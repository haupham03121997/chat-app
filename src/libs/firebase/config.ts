// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // apiKey: "AIzaSyCUA9qpPbNSPHr1N6Be3Lr9UHeHV0UtD2E",
  // authDomain: "app-chat-3f365.firebaseapp.com",
  // projectId: "app-chat-3f365",
  // storageBucket: "app-chat-3f365.appspot.com",
  // messagingSenderId: "40298972262",
  // appId: "1:40298972262:web:d7a8be13fab80ebdd2d9a7",
  // measurementId: "G-PGR3TLQWY0"
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
// const analytics = getAnalytics(app)
const database = getFirestore(app)
const storage = getStorage()

export { app, auth, database, storage }
