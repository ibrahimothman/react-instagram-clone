import React, { createContext, useState, useEffect } from "react"
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged,
    signOut,
} from "firebase/auth";
import { query, collection, where, getDocs } from "firebase/firestore";
import { auth, db } from "../lib/Firebase";

const UserContext = createContext({
    activeUser: null,
    setUser: (user) => {},
})

export function UserContextProvider({ children }) {

    const [activeUser, setActiveUser] = useState(null)

    const setUser = async (user) => {
        console.log(user);
        const q = query(collection(db, "users"), where("id", "==", user.id));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            setActiveUser(doc.data())
        });
    }


    const ctx = {
        activeUser,
        setUser,
    }
    return (
        <UserContext.Provider value={ctx}>
            {children}
        </UserContext.Provider>
    )
}


export default UserContext
