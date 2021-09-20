import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
}
const firebaseApp = initializeApp(config);
const db = getFirestore();
const auth = getAuth()

export default firebaseApp
export {
    db,
    auth
}