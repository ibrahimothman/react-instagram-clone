import React, {useState, useEffect} from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { getUserByDocId, getPhotosByUserId } from '../services/Firebase'
import * as ROUTES from '../constants/Routes'
import useUser from '../hooks/useUser'
import Header from '../components/Header'
import UserProfile from '../components/profile'

function Profile() {
    const { userDocId } = useParams()
    const history = useHistory()
    const [isUserExist, setIsUserExist] = useState(false)
    const [user, setUser] = useState(null)

    useEffect(() => {
        async function isUserExisted() {
            const user = await getUserByDocId(userDocId)
            if (user) {
                setUser(user)
                setIsUserExist(true)
                // const photos = await getPhotosByUserId(user.userId)
                // console.log(photos)
            } else {
                setIsUserExist(false)
                setUser(null)
                history.push(ROUTES.NOT_FOUND)
            }
        }

        isUserExisted()
    }, [])
    return (
        isUserExist ? (
            <div className="bg-gray-background">
                <Header />
                <div className="mx-auto max-w-screen-lg">
                    <UserProfile user={user}/>
                </div>
            </div>
        ) : (
            <div></div>
        )
    )
}

export default Profile
