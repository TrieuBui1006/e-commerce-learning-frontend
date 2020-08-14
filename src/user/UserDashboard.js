import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import Layout from '../core/Layout'
import { isAuthenticated } from '../auth'
import { getPurchaseHistory } from '../api/apiUser'

const UserDashboard = () => {
  const [history, setHistory] = useState([])

  const {
    user: { _id, name, email, role },
    token,
  } = isAuthenticated()

  const init = (userId, token) => {
    getPurchaseHistory(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setHistory(data)
      }
    })
  }

  useEffect(() => {
    init(_id, token)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

  const purchaseHistory = (history) => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">Purchase history</h3>
        <ul className="list-group">
          <li className="list-group-item">
            {history.map((h, i) => {
              return (
                <div key={i}>
                  <hr />
                  <h4>Amount: {h.amount}</h4>
                  <h5>Delivery address: {h.address}</h5>
                  <h5>
                    <strong>Purchased date:</strong>{' '}
                    {moment(h.createdAt).format('MMM Do YY')} -{' '}
                    {moment(h.createdAt).fromNow()}
                  </h5>
                  {h.products.map((p, i) => {
                    return (
                      <div key={i} style={{ marginBottom: '20px' }}>
                        <h6>
                          <strong>Product name:</strong> {p.name}
                        </h6>
                        <h6>
                          <strong>Product price:</strong> ${p.price}
                        </h6>
                        <h6>
                          <strong>Product quantity:</strong> {p.count}
                        </h6>
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </li>
        </ul>
      </div>
    )
  }

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
          {purchaseHistory(history)}
        </div>
      </div>
    </Layout>
  )
}

export default UserDashboard
