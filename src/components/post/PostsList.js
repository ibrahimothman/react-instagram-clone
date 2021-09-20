import React from 'react'
import Post from './Post'

function PostsList({ posts }) {
    return (
        <>
            {posts.map(post => <Post key={post.docId} post={post}/>)}
        </>
    )
}

export default PostsList
