import React from 'react'
import Skeleton from 'react-loading-skeleton'
import Photo from './Photo'

function Photos({ photos }) {
    return (
        <div className="h-16 border-t border-gray-primary mt-12 pt-4">
            <div className="grid grid-cols-3 gap-8 mt-4 mb-12">
                {!photos ? (
                    <Skeleton count={12} width={320} height={400}/>
                ) : photos.length > 0 ?(
                    photos.map(photo => <Photo key={photo.docId} photo={photo}/>)
                ) : ''}
            </div>
            {!photos || photos.length < 1 && <p className="text-center text-2xl">No posts yet</p>}
        </div>
    )
}

export default Photos
