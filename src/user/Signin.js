import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

import Layout from '../core/Layout'
import { signin, authenticate, isAuthenticated } from '../auth'

const Signin = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    loading: false,
    redirectToRefferrer: false,
  })

  const { email, password, error, loading, redirectToRefferrer } = values
  const { user } = isAuthenticated()

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value })
  }

  const clickSubmit = (event) => {
    event.preventDefault()
    setValues({ ...values, error: false, loading: true })
    signin({ email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false })
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToRefferrer: true,
          })
        })
      }
    })
  }

  const signInForm = (
    <form>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter Email"
          onChange={handleChange('email')}
          value={email}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter Password"
          onChange={handleChange('password')}
          value={password}
        />
      </div>
      <button onClick={clickSubmit} className="btn btn-primary">
        Submit
      </button>
    </form>
  )

  const showError = (
    <div
      className="alert alert-danger"
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  )

  const showLoading = loading && (
    <div className="alert alert-info">Loading...</div>
  )

  const redirectUser = () => {
    if (redirectToRefferrer) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />
      } else {
        return <Redirect to="/user/dashboard" />
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />
    }
  }

  return (
    <Layout
      title="Sign in"
      description="Sign in to Node React E-commerce"
      className="container col-md-8 offset-md-2"
    >
      {showError}
      {showLoading}
      {signInForm}
      {redirectUser()}
    </Layout>
  )
}

export default Signin
