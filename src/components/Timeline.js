import React from 'react'
import Skeleton from 'react-loading-skeleton'
import usePhotos from '../hooks/usePhotos'
import PostsList from './post/PostsList'

function Timeline() {
    const { photos } = usePhotos()
    return (
        <div className="container col-span-2">
            {!photos ? (
                <Skeleton count={4} width={640} height={500} className="mb-5"/>

            ): photos.length > 0 ? (
                <PostsList posts={photos}/>
            ) : (
                <p className="text-center text-2xl">Follow people to see photos</p>
            )}
        </div>
    )
}

export default Timeline
