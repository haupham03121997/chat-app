// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // apiKey: 'AIzaSyDM5RWJf-AUd8z9iJAUzrLJeWIILoDnGfs',
  // authDomain: 'chat-app-29d52.firebaseapp.com',
  // projectId: 'chat-app-29d52',
  // storageBucket: 'chat-app-29d52.appspot.com',
  // messagingSenderId: '398736466293',
  // appId: '1:398736466293:web:0b85d73c76ed458d3cb33c',
  // measurementId: 'G-KK5NPLN8KF'
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
const database = getFirestore()

export { app, auth, database }
