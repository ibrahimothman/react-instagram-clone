import React from 'react'
import { Link } from 'react-router-dom'

function Comment({ comment }) {
    return (
        <>
            <p className="mb-1">
                <Link to="/p/">
                    <span className="mr-1 font-bold">{comment.displayName}</span>
                </Link>
                <span>{comment.comment}</span>
            </p>
        </>
    )
}

export default Comment
