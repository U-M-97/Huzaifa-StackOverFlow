// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAE_9qpKEITOndUjUezVUjdydmhSrloWww',
  authDomain: 'stackoverflow-clone-c32f7.firebaseapp.com',
  projectId: 'stackoverflow-clone-c32f7',
  storageBucket: 'stackoverflow-clone-c32f7.appspot.com',
  messagingSenderId: '743938479600',
  appId: '1:743938479600:web:34a6872b213768290bf935',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const provider = new GoogleAuthProvider();

export { auth, provider };
