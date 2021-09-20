import React, {lazy, Suspense, useContext} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import * as ROUTES from './constants/Routes'
import ProtectedRoutes from "./helpers/ProtectedRoutes";
import ProtectedGuestRoutes from "./helpers/ProtectedGuestRoutes";
import FirebaseContext from "./context/Firebase";

const Login = lazy(() => import('./pages/Login'))
const Signup = lazy(() => import('./pages/Signup'))
const Dashboard = lazy(() => import('./pages/Dashboard'))


export default function App() {
  const { authUser } = useContext(FirebaseContext)
  return (
    <Router>
      <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          <ProtectedRoutes user={authUser} path={ROUTES.DASHBOARD} exact>
            <Dashboard />
          </ProtectedRoutes>
          <ProtectedGuestRoutes user={authUser} path={ROUTES.LOGIN}>
            <Login />
          </ProtectedGuestRoutes>
          <ProtectedGuestRoutes user={authUser} path={ROUTES.SIGN_UP}>
            <Signup />
          </ProtectedGuestRoutes>
        </Switch>
      </Suspense>
    </Router>
  );
}
