// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBHk0Jll7xgQ8_M5WW966QJm29A0xj_l14',
  authDomain: 'waterlife-3bbeb.firebaseapp.com',
  projectId: 'waterlife-3bbeb',
  storageBucket: 'waterlife-3bbeb.appspot.com',
  messagingSenderId: '700121449380',
  appId: '1:700121449380:web:9481396482e671a2b03731',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;
