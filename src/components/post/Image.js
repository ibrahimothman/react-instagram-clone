import React from 'react'

function Image({ src, caption }) {
    return (
        <img
            className=""
            src={src} alt={caption} />
    )
}

export default Image
