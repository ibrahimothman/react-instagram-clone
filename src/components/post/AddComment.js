import React, {useState} from 'react'
import useUser from '../../hooks/useUser'
import { addComment } from '../../services/Firebase'

function AddComment({ docId, inputRef, onAddComment }) {
    const { user } = useUser()
    const [comment, setComment] = useState('')
    const submitHandler = async (e) => {
        e.preventDefault()
        if (comment.length > 0) {
            onAddComment({
                comment,
                displayName: user.username
            })
            await addComment(docId, comment, user.username)
            setComment('')
        }
    }
    return (
        <div className="border-t border-gray-primary">
            <form
                method="post"
                className="flex justify-between pl-0 pr-5"
                onSubmit={submitHandler}>

                <input
                    type="text"
                    aria-label="add a comment"
                    autoComplete="off"
                    className="text-sm text-gray-base w-full mr-3 py-5 px-4"
                    placeholder="Add a comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    ref={inputRef}
                />
                <button
                    className={`text-sm font-bold text-blue-medium ${!comment && 'opacity-25'}`}
                    disabled={comment.length < 1}
                    type="submit"
                    onClick={submitHandler}
                    >
                    Post
                </button>
            </form>
        </div>
    )
}

export default AddComment
