import {useState, useEffect, useContext} from 'react'
import FirebaseContext from '../context/Firebase'
import { getPhotos, getUserByUserId } from '../services/Firebase'

export default function usePhotos() {

    const [photos, setPhotos] = useState(null)
    const { authUser, isLoggedIn } = useContext(FirebaseContext)

    useEffect(() => {
        async function getTimelinePhotos() {
            const [{following}] = await getUserByUserId(authUser.uid)
            if (following && following.length > 0) {

                // get photos
                const photos = await getPhotos(following)
                // get photos with user's details like (username)
                const photosWithUserDetails = await Promise.all(
                    photos.map(async photo => {
                        const isLikedByLoggedInUser = photo.likes.includes(authUser.uid)
                        const [user] = await getUserByUserId(photo.userId)
                        return {
                            ...photo,
                            isLikedByLoggedInUser,
                            user: {
                                username: user?.username
                            }
                        }
                    })
                )
                setPhotos(photosWithUserDetails)
            }
        }

        if (isLoggedIn) {
            getTimelinePhotos()
        } else {
            setPhotos(null)
        }
    }, [isLoggedIn])

    return {
        photos
    }
}

