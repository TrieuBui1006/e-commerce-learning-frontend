import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

import Layout from '../core/Layout'
import { isAuthenticated } from '../auth'
import { read, update, updateUser } from '../api/apiUser'

const Profile = ({ match }) => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: false,
  })

  const { token } = isAuthenticated()

  const { name, email, password, error, success } = values

  const init = (userId) => {
    // console.log(userId)
    read(userId, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: true })
      } else {
        setValues({
          ...values,
          name: data.name,
          email: data.email,
        })
      }
    })
  }

  useEffect(() => {
    init(match.params.userId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value })
  }

  const clickSubmit = (e) => {
    e.preventDefault()
    update(match.params.userId, token, { name, email, password }).then(
      (data) => {
        if (data.error) {
          setValues({ ...values, error: true })
        } else {
          updateUser(data, () => {
            setValues({
              ...values,
              name: data.name,
              email: data.email,
              success: true,
            })
          })
        }
      }
    )
  }

  const redirectUser = (success) => {
    if (success) {
      return <Redirect to="/cart" />
    }
  }

  const profileUpdate = (name, email, password) => (
    <form>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          onChange={handleChange('name')}
          className="form-control"
          value={name}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          type="email"
          onChange={handleChange('email')}
          className="form-control"
          value={email}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          type="password"
          onChange={handleChange('password')}
          className="form-control"
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
      Network Error
    </div>
  )

  return (
    <Layout
      title="Profile"
      description="Update your profile"
      className="container-fluid"
    >
      {showError}
      <h2 className="mb-4">Profile update</h2>
      {profileUpdate(name, email, password)}
      {redirectUser(success)}
    </Layout>
  )
}

export default Profile
