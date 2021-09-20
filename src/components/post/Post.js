import React, {useRef, useState} from 'react'
import Header from './Header'
import Image from './Image'
import Actions from './Actions'
import Footer from './Footer'
import CommentsList from './CommentsList'
import AddComment from './AddComment'
import { formatDistance } from 'date-fns'

function Post({ post }) {

    const addCommentRef = useRef(null)
    const [comments, setComments] = useState(post.comments)

    const handleCommentFocus = () => {
        addCommentRef.current.focus()
    }

    const addCommentHandler = ({ comment, displayName }) => {
        setComments(comments => [{comment, displayName}, ...comments])

    }
    return (
        <div className="rounded col-span-4 border bg-white border-gray-primary mb-8">
            <Header username={post.user?.username}/>
            <Image src={post.imageSrc} caption={post.caption}/>
            <Actions
                docId={post.docId}
                totalLikes={post.likes?.length}
                hasBeenLiked={post.isLikedByLoggedInUser}
                handleFocus={handleCommentFocus}/>
            <Footer username={post.user.username} caption={post.caption}/>
            <div className="p-4 pt-1 pb-4">
                <CommentsList comments={comments} postUserId={post.user?.docId}/>
                <p className="text-gray-base text-xs mt-2">
                    {formatDistance(post.dateCreated, new Date())} ago
                </p>
            </div>
            <AddComment docId={post.docId} onAddComment={addCommentHandler} inputRef={addCommentRef}/>
        </div>
    )
}

export default Post
