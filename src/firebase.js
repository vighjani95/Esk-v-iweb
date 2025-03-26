// src/firebase.js
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyChvvHArQHi4ZKDeFpdzj0tadHgTOs4EJc',
  authDomain: 'eskuvoi-webgaleria.firebaseapp.com',
  projectId: 'eskuvoi-webgaleria',
  storageBucket: 'eskuvoi-webgaleria.appspot.com',
  messagingSenderId: '209353412110',
  appId: '1:209353412110:web:398e824b96e557601a765f',
}

const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
