import React, { createContext, useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/Firebase";

const FirebaseContext = createContext({
    authUser: null,
    login: ({ email, password }) => {},
    isLoggedIn: false,
    error: null
})

export function FirebaseContextProvider({ children }) {


    const [authUser, setAuthUser] = useState(null)
    const [error, setError] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(null)

    const login = async ({ email, password }) => {
        try {
            setError(null)
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

    const ctx = {
        authUser,
        login,
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
