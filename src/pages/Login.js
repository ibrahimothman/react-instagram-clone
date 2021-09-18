import React, {useEffect, useState, useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'
import FirebaseContext from '../context/Firebase'
import * as ROUTES from '../constants/Routes'
function Login() {

    const history = useHistory()

    const firebaseCtx = useContext(FirebaseContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const isInvalid = password === '' || email === ''

    useEffect(() => {
        document.title = 'Login- Instagram'
    }, [])

    const loginHandler = async (e) => {
        try {
            e.preventDefault()
            await firebaseCtx.login({
                email,
                password
            })
            // to dashboard page
            history.push(ROUTES.DASHBOARD)
        } catch (err) {
            setEmail('')
            setPassword('')
        }

    }
    return (
        <div className="container flex mx-auto max-w-screen-md items-center h-screen">
            <div className="flex w-3/5">
                <img src="/images/iphone-with-profile.jpg" alt="iphone with instagram profile"/>
            </div>

            <div className="flex flex-col w-2/5">
                <div className="flex flex-col border rounded border-gray-primary items-center p-4 mb-4 bg-white">

                    <h1 className="flex justify-center w-full">
                        <img src="/images/logo.png" alt="Instagram logo" className="w-6/12 mt-2 mb-4"/>
                    </h1>

                    {/* errors */}
                    {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

                    <form onSubmit={loginHandler} method="POST">
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
                            Log In
                        </button>
                    </form>
                </div>
                <div className="flex justify-center items-center flex-col w-full bg-white p-4
                    border rounded border-gray-primary">

                    <p className="text-sm">Dont't have an account?{` `}
                        <Link to="/signup" className="font-bold text-blue-medium">
                            Sign up
                        </Link>
                    </p>

                </div>
            </div>
        </div>
    )
}

export default Login
