import {useState, useContext, useEffect} from 'react'
import FirebaseContext from '../context/Firebase'
import { getUserByUserId } from '../services/Firebase'

export default function useUser() {
    const [activeUser, setActiveUser] = useState(null)
    const { isLoggedIn, authUser } = useContext(FirebaseContext)

    useEffect(() => {
        async function getUserObjectByUserId() {
            const [response] = await getUserByUserId(authUser.uid)
            setActiveUser(response)
        }

        if (authUser?.uid) {
            getUserObjectByUserId()
        } else {
            setActiveUser(null)
        }

    }, [isLoggedIn])

    return {
        user: activeUser
    }
}

