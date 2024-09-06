// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'car-marketplace-96d7c.firebaseapp.com',
  projectId: 'car-marketplace-96d7c',
  storageBucket: 'car-marketplace-96d7c.appspot.com',
  messagingSenderId: '276605007119',
  appId: '1:276605007119:web:b2a83dc8b9c778a95b7a7a',
  measurementId: 'G-KS9QPK8E0R',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
