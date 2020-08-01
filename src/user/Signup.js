import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import Layout from '../core/Layout'
import { signup } from '../auth'

const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: false,
  })

  const { name, email, password, error, success } = values

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value })
  }

  const clickSubmit = (event) => {
    event.preventDefault()
    setValues({ ...values, error: false })
    signup({ name, email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false })
      } else {
        setValues({
          ...values,
          name: '',
          email: '',
          password: '',
          error: '',
          success: true,
        })
      }
    })
  }

  const signUpForm = (
    <form>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Username"
          onChange={handleChange('name')}
          value={name}
        />
      </div>
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

  const showSuccess = (
    <div
      className="alert alert-info"
      style={{ display: success ? '' : 'none' }}
    >
      New account is created. Please <Link to="/signin">Sign in</Link>
    </div>
  )

  return (
    <Layout
      title="Sign up"
      description="Sign up to Node React E-commerce"
      className="container col-md-8 offset-md-2"
    >
      {showError}
      {showSuccess}
      {signUpForm}
    </Layout>
  )
}

export default Signup
