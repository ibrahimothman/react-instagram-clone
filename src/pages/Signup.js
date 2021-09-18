import React, {useEffect, useState, useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'
import FirebaseContext from '../context/Firebase'
import * as ROUTES from '../constants/Routes'
function Signup() {

    const history = useHistory()

    const firebaseCtx = useContext(FirebaseContext)

    const [username, setUsername] = useState('')
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const isInvalid = password === '' || email === '' || username === '' || fullName === ''

    useEffect(() => {
        document.title = 'Sign up - Instagram'
    }, [])

    const signUpHandler = async (e) => {
        try {
            e.preventDefault()
            await firebaseCtx.signup({
                username,
                email,
                password,
            })
            // to dashboard page
            history.push(ROUTES.DASHBOARD)
        } catch (err) {
            setEmail('')
            setPassword('')
        }

    }
    return (
        <div className="container flex mx-auto max-w-screen-md items-center h-screen items-center  justify-center">


            <div className="flex flex-col w-2/5">
                <div className="flex flex-col border rounded border-gray-primary items-center p-4 mb-4 bg-white">

                    <h1 className="flex justify-center w-full">
                        <img src="/images/logo.png" alt="Instagram logo" className="w-6/12 mt-2 mb-4"/>
                    </h1>

                    {/* errors */}
                    {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

                    <form onSubmit={signUpHandler} method="POST">
                        <input
                            aria-label="Enter your username"
                            type="text"
                            placeholder="Username"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border
                                border-gray-primary rounded mb-2"
                            onChange={({ target }) => setUsername(target.value)}
                            value={username}
                        />

                        <input
                            aria-label="Enter your full name"
                            type="text"
                            placeholder="Full name"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border
                                border-gray-primary rounded mb-2"
                            onChange={({ target }) => setFullName(target.value)}
                            value={fullName}
                        />

                        <input
                            aria-label="Enter your email address"
                            type="email"
                            placeholder="Email address"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border
                                border-gray-primary rounded mb-2"
                            onChange={({ target }) => setEmail(target.value)}
                            value={email}
                        />

                        <input
                            aria-label="Enter your password"
                            type="password"
                            placeholder="Password"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border
                                border-gray-primary rounded mb-2"
                            onChange={({ target }) => setPassword(target.value)}
                            value={password}
                        />

                        <button
                            disabled={isInvalid}
                            type="submit"
                            className={`bg-blue-medium text-white w-full rounded h-8 font-bold
                                ${isInvalid && 'opacity-50'}
                            `}>
                            Sign up
                        </button>
                    </form>
                </div>
                <div className="flex justify-center items-center flex-col w-full bg-white p-4
                    border rounded border-gray-primary">

                    <p className="text-sm">Already have an account?{` `}
                        <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">
                            Login
                        </Link>
                    </p>

                </div>
            </div>
        </div>
    )
}

export default Signup
