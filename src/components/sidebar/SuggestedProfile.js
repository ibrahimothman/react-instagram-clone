import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { updateLoggedInUserFollowing, updateFollowedUserFollowers } from '../../services/Firebase'
import useUser from '../../hooks/useUser'

function SuggestedProfile({ profile }) {

    const [isFollowing, setIsFollowing] = useState(false)
    const {user} = useUser()

    const followHandler = async (e) => {
        setIsFollowing(true)
        // update auth followings array
        await updateLoggedInUserFollowing(user.docId, profile.userId, isFollowing)
        await updateFollowedUserFollowers(profile.id, user.userId, isFollowing)
        // update followed's followers array
    }
    return (
        !isFollowing ? (
            <div className="flex flex-row items-center justify-between">
                <div className="flex items-center justify-between">
                    <img
                        className="rounded-full w-8 flex mr-3"
                        src="/images/avatars/users/default.png"
                        alt="" />

                    <Link to={`/p/${profile.id}`}>
                        <p className="font-bold text-sm">{profile.username}</p>
                    </Link>
                </div>
                <div>
                    <button className="text-sm font-bold text-blue-medium"
                        type="button"
                        onClick={followHandler}
                        >
                        Follow
                    </button>
                </div>
            </div>
        ) : ('')
    )
}

export default SuggestedProfile
