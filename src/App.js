import React, {lazy, Suspense} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import * as ROUTES from './constants/Routes'

const Login = lazy(() => import('./pages/Login'))
const Signup = lazy(() => import('./pages/Signup'))
const Dashboard = lazy(() => import('./pages/Dashboard'))

export default function App() {
  return (
    <Router>
      <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          <Route path={ROUTES.DASHBOARD} component={Dashboard} exact></Route>
          <Route path={ROUTES.LOGIN} component={Login}></Route>
          <Route path={ROUTES.SIGN_UP} component={Signup}></Route>
        </Switch>
      </Suspense>
    </Router>
  );
}
