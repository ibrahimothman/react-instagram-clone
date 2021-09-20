import React from 'react'
import Post from './Post'

function PostsList({ posts }) {
    return (
        <div>
            {posts.map(post => <Post key={post.docId} post={post}/>)}
        </div>
    )
}

export default PostsList
