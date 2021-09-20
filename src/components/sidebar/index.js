import React, { useContext } from 'react'
import useUser from '../../hooks/useUser'
import User from './User'
import Suggestions from './Suggestions'
function Sidebar() {

    const {user} = useUser()
    return (
        <div className="p-4">
            <User username={user?.username} email={user?.emailAddress}/>
            <Suggestions loggedInUserId={user?.userId} following={user?.following}/>
        </div>
    )
}

export default Sidebar
