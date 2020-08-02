import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import PrivateRoute from './auth/PrivateRoute'
import AdminRoute from './auth/AdminRoute'

import Signup from './user/Signup'
import Signin from './user/Signin'
import Home from './core/Home'
import Dashboard from './user/UserDashboard'
import AdminDashboard from './user/AdminDashboard'

const Routes = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signin" exact component={Signin} />
          <Route path="/signup" exact component={Signup} />
          <AdminRoute
            path="/admin/dashboard"
            exact
            component={AdminDashboard}
          />
          <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default Routes
