import React, { createContext, useState, useEffect } from "react"
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged,
    signOut,
} from "firebase/auth";
import { collection, addDoc, getDocs, where, query } from "firebase/firestore";
import { auth, db } from "../lib/Firebase";

const FirebaseContext = createContext({
    authUser: null,
    login: ({ email, password }) => {},
    signup: ({ username, email, password }) => {},
    signout: () => {},
    isLoggedIn: false,
    error: null
})

export function FirebaseContextProvider({ children }) {

    // setup auth listener
    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                setAuthUser(user)
                setIsLoggedIn(true)
            } else {
              // User is signed out
              setAuthUser(null)
              setIsLoggedIn(false)
            }
        });
    }, [])

    const [authUser, setAuthUser] = useState(null)
    const [error, setError] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(null)


    const login = async ({ email, password }) => {
        try {
            init()
            const { user } = await signInWithEmailAndPassword(auth, email, password)
            setAuthUser(user)
            setIsLoggedIn(true)
        } catch (err) {
            setError({
                code: err.code,
                message: err.message
            })
            setAuthUser(null)
            setIsLoggedIn(false)
        }
    }

    const signup = async ({ username, email, password }) => {
        try {
            init()
            // create user
            const { user } = await createUserWithEmailAndPassword(auth, email, password)
            // update profile
            await updateProfile(user, { displayName: username })

            const createdUser = {
                userId: user.uid,
                username: username.toLowerCase(),
                emailAddress: user.email.toLowerCase(),
                following: [],
                followers: [],
                dateCreated: Date.now()
            }
            // add him to firestore
            await addDoc(collection(db, 'users'), createdUser)
            // update states
            setAuthUser(createdUser)
            setIsLoggedIn(true)
        } catch (err) {
            setError({
                code: err.code,
                message: err.message
            })
            setAuthUser(null)
            setIsLoggedIn(false)
        }
    }

    const signout = async() => {
        await signOut(auth)
        init()
    }

    const init = () => {
        setAuthUser(null)
        setError(null)
        setIsLoggedIn(false)
    }

    const ctx = {
        authUser,
        login,
        signup,
        signout,
        isLoggedIn,
        error: error,
    }
    return (
        <FirebaseContext.Provider value={ctx}>
            {children}
        </FirebaseContext.Provider>
    )
}


export default FirebaseContext
