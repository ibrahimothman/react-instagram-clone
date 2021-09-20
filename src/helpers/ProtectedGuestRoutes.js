import { Route, Redirect } from 'react-router-dom'
import * as ROUTES from '../constants/Routes'

export default function ProtectedGuestRoutes({ user, children }) {

    return (
        <Route
            render={({ location }) => {
                if (!user) {
                    return children
                }

                if (user) {
                    return (
                        <Redirect
                            to={{
                                pathname: ROUTES.DASHBOARD,
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