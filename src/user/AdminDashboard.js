import React from 'react'
import { Link } from 'react-router-dom'

import Layout from '../core/Layout'
import { isAuthenticated } from '../auth'

const AdminDashboard = () => {
  const {
    user: { name, email, role },
  } = isAuthenticated()

  const adminLinks = (
    <div className="card">
      <h4 className="card-header">Admin Links</h4>
      <ul className="list-group">
        <li className="list-group-item">
          <Link className="nav-link" to="/create/category">
            Create Category
          </Link>
        </li>
        <li className="list-group-item">
          <Link className="nav-link" to="/create/product">
            Create Product
          </Link>
        </li>
        <li className="list-group-item">
          <Link className="nav-link" to="/admin/orders">
            View Orders
          </Link>
        </li>
        <li className="list-group-item">
          <Link className="nav-link" to="/admin/products">
            Manage Products
          </Link>
        </li>
      </ul>
    </div>
  )

  const adminInfo = (
    <div className="card mb-5">
      <h3 className="card-header">Admin Information</h3>
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

  return (
    <Layout
      title="Dashboard"
      description={`Goodday ${name}`}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-3">{adminLinks}</div>
        <div className="col-9">{adminInfo}</div>
      </div>
    </Layout>
  )
}

export default AdminDashboard
