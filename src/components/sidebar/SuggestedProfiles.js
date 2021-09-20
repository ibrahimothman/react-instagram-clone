import React from 'react'
import SuggestedProfile from './SuggestedProfile'

function SuggestedProfiles({ profiles }) {
    return (
        <div className="grid gap-4 mt-4">
            {profiles.map(profile => <SuggestedProfile key={profile.id} profile={profile}/>)}
        </div>
    )
}

export default SuggestedProfiles
