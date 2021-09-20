import { Route, Redirect } from 'react-router-dom'
import * as ROUTES from '../constants/Routes'

export default function ProtectedRoutes({ user, children }) {

    return (
        <Route
            render={({ location }) => {
                if (user) {
                    return children
                }

                if (!user) {
                    return (
                        <Redirect
                            to={{
                                pathname: ROUTES.LOGIN,
                                state: {from: location}
                            }}
                        />
                    )
                }

                return null
            }}
        />
    )
}