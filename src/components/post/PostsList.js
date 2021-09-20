import React from 'react'
import Post from './Post'

function PostsList({ posts }) {
    return (
        <div>
            {posts.map(post => <Post key={post.photoId} post={post}/>)}
        </div>
    )
}

export default PostsList
