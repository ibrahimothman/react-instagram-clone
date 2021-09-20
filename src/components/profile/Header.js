import { useState, useEffect } from 'react'
import useUser from '../../hooks/useUser'
import { updateLoggedInUserFollowing, updateFollowedUserFollowers} from '../../services/Firebase'
import Skeleton from 'react-loading-skeleton'

function Header({ profile, photosCount }) {

    const { user } = useUser()
    const [isFollowingProfile, setIsFollowingProfile] = useState(false)
    const isLoggedInUserProfile = user && user.userId === profile.userId
    const [followersCount, setFollowersCount] = useState(profile.followers.length)

    useEffect(() => {
        if (user) {
            setIsFollowingProfile(profile.followers.includes(user.userId))
        }
    }, [user])

    const followHandler = async () => {
        setIsFollowingProfile((prev) => !prev)
        setFollowersCount((prev) => isFollowingProfile ? prev - 1 : prev + 1)
        await updateLoggedInUserFollowing(user.docId, profile.userId, isFollowingProfile)
        await updateFollowedUserFollowers(profile.docId, user.userId, isFollowingProfile)
    }


    return (
        <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
            <div className="container flex justify-center">
                <img
                    className="rounded-full flex h-40 w-40"
                    src="/images/avatars/users/default.png"
                    alt={`${profile.username} profile picture`} />
            </div>
            <div className="col-span-2 flex items-center justify-center flex-col">
                <div className="container flex items-center">
                    <p className="text-2xl mr-4">
                        {profile.username}
                    </p>
                    {!isLoggedInUserProfile && (
                        <button
                            className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
                            type="button"
                            onClick={followHandler}>
                            {isFollowingProfile ? 'Unfollow' : 'Follow'}
                        </button>
                    )}
                </div>
                <div className="container flex mt-4">
                        {!profile.following || !profile.followers ? (
                            <Skeleton count={1} width={677} height={24}/>
                        ): (
                            <>
                                <p className="mr-10">
                                    <span className="font-bold">
                                        {photosCount}
                                    </span>{' '}{photosCount === 1 ? 'photo' : 'photos'}
                                </p>
                                <p className="mr-10">
                                    <span className="font-bold">{followersCount}</span>
                                    {' '}
                                    {followersCount === 1 ? 'follower' : 'followers'}
                                </p>
                                <p className="mr-10">
                                    <span className="font-bold">{profile.following.length}</span>
                                    {' '}following
                                </p>
                            </>
                        )}
                </div>
                <div className="container mt-4">
                    <p className="font-medium">
                        {!profile.emailAddress ? (
                            <Skeleton count={1} width={667} height={24}/>
                        ) : (
                            profile.emailAddress
                        )}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Header
