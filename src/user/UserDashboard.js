import React from 'react'
import { Link } from 'react-router-dom'

import Layout from '../core/Layout'
import { isAuthenticated } from '../auth'

const UserDashboard = () => {
  const {
    user: { _id, name, email, role },
  } = isAuthenticated()

  const userLinks = (
    <div className="card">
      <h4 className="card-header">User Links</h4>
      <ul className="list-group">
        <li className="list-group-item">
          <Link className="nav-link" to="/cart">
            My Cart
          </Link>
        </li>
        <li className="list-group-item">
          <Link className="nav-link" to={`/profile/${_id}`}>
            Update Profile
          </Link>
        </li>
      </ul>
    </div>
  )

  const userInfo = (
    <div className="card mb-5">
      <h3 className="card-header">User Information</h3>
      <ul className="list-group">
        <li className="list-group-item">
          <strong>Name: </strong>
          {name}
        </li>
        <li className="list-group-item">
          <strong>Email: </strong>
          {email}
        </li>
        <li className="list-group-item">
          <strong>Role: </strong>
          {role === 1 ? 'Admin' : 'Registered User'}
        </li>
      </ul>
    </div>
  )

  const purchaseHistory = (
    <div className="card mb-5">
      <h3 className="card-header">Purchase history</h3>
      <ul className="list-group">
        <li className="list-group-item">history</li>
      </ul>
    </div>
  )

  return (
    <Layout
      title="Dashboard"
      description={`Goodday ${name}`}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-3">{userLinks}</div>
        <div className="col-9">
          {userInfo}
          {purchaseHistory}
        </div>
      </div>
    </Layout>
  )
}

export default UserDashboard
