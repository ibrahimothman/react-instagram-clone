import React from 'react'
import Comment from './Comment'

function CommentsList({ comments, postUserId }) {
    return (
        <>
            {comments && comments.length >= 3 && (
                <p className="text-sm text-gray-base mb-1 cursor-pointer">
                    View all {comments.length} comments
                </p>
            )}
            {comments.slice(0, 3).map(comment => (
                <Comment key={`${comment.comment}-${comment.displayName}`} comment={comment} postUserId={postUserId}/>
            ))}
        </>
    )
}

export default CommentsList
