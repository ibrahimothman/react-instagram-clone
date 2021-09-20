import React, {useState, useEffect} from 'react'
import Skeleton from 'react-loading-skeleton'
import { getSuggestedProfiles } from '../../services/Firebase'
import SuggestedProfiles from './SuggestedProfiles'

function Suggestions({ loggedInUserId, following }) {
    const [profiles, setProfiles] = useState(null)

    useEffect(() => {
        async function suggestProfiles() {
            const results = await getSuggestedProfiles(loggedInUserId, following)
            setProfiles(results)
        }

        console.log(loggedInUserId);
        if (loggedInUserId) {
            suggestProfiles()
        }
    }, [loggedInUserId])
    return (
        !profiles || profiles.length === 0 ? (
            <Skeleton count={1} height={150} className="mt-5"/>
        ) : (
            <div  className="rounded flex flex-col">
                <div className="flex items-center justify-between mb-2 text-sm">
                    <p className="font-bold text-gray-base">Suggestions for you</p>
                </div>
                <SuggestedProfiles profiles={profiles}/>
            </div>
        )
    )
}

export default Suggestions
