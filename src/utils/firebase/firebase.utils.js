import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAvfvu4RCzYTTf823Y-yLCrLNyymnfF1nw",
    authDomain: "crwn-db-42ad7.firebaseapp.com",
    projectId: "crwn-db-42ad7",
    storageBucket: "crwn-db-42ad7.appspot.com",
    messagingSenderId: "924375498766",
    appId: "1:924375498766:web:a9e1fd627b616950eebc5f"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const authProvider = new GoogleAuthProvider();
authProvider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, authProvider);