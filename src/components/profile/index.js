import React, {useReducer, useEffect} from 'react'
import Skeleton from 'react-loading-skeleton'
import { getPhotosByUserId } from '../../services/Firebase'
import Header from './Header'
import Photos from './Photos'

function UserProfile({ user }) {

    const reducer = (state, newState) => ({ ...state, ...newState })
    const initialState = {
        photos: [],
        followersCount: user.followers.length
    }
    const [{photos, followersCount}, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        async function getProfilePhotos() {
            const photos = await getPhotosByUserId(user.userId)
            dispatch({photos: photos})
        }

        if (user) {
            getProfilePhotos()
        }
    }, [user])
    return (
        <>
            <Header
                photosCount={photos ? photos.length : 0}
                profile={user}
                />
            <Photos photos={photos}/>
        </>
    )
}

export default UserProfile
