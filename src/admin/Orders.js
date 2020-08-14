import React, { useState, useEffect } from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom'
import {
  listOrders,
  getStatusValues,
  updateStatusValues,
} from '../api/apiAdmin'
import moment from 'moment'

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [statusValues, setStatusValues] = useState([])

  const { user, token } = isAuthenticated()

  const loadOrders = () => {
    listOrders(user._id, token).then((response) => {
      if (response.error) {
        console.log(response.error)
      } else {
        setOrders(response)
      }
    })
  }

  const loadStatusValues = () => {
    getStatusValues(user._id, token).then((response) => {
      if (response.error) {
        console.log(response.error)
      } else {
        setStatusValues(response)
      }
    })
  }

  useEffect(() => {
    loadOrders()
    loadStatusValues()
  }, [])

  const showOrdersLength = (orders) => {
    if (orders.length > 1) {
      return (
        <h1 className="text-danger display-2">Total orders: {orders.length}</h1>
      )
    } else {
      return <h1 className="text-danger">No orders</h1>
    }
  }

  const showInput = (key, value) => (
    <div className="input-group mb-2 mr-sm-2">
      <div className="input-group-prepend">
        <div className="input-group-text">{key}</div>
      </div>
      <input type="text" value={value} className="form-control" readOnly />
    </div>
  )

  const handleStatusChange = (e, orderId) => {
    updateStatusValues(user._id, token, orderId, e.target.value).then(
      (data) => {
        if (data.error) {
          console.log('Status update failed')
        } else {
          loadOrders()
        }
      }
    )
  }

  const showStatus = (o) => (
    <div className="form-group">
      <h3 className="mark mb-4">Status: {o.status}</h3>
      <select
        className="form-control"
        onChange={(e) => handleStatusChange(e, o._id)}
      >
        <option>Update Status</option>
        {statusValues.map((status, i) => (
          <option key={i} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  )

  return (
    <Layout
      title="Orders List"
      description={`Good day ${user.name}, you can manage all the orders here`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showOrdersLength(orders)}

          {orders.map((o, i) => {
            return (
              <div
                className="mt-5"
                key={i}
                style={{ borderBottom: '5px solid indigo' }}
              >
                <h2 className="mb-5">
                  <span className="bg-primary">
                    <strong>Order ID:</strong> {o._id}
                  </span>
                </h2>

                <ul className="list-group mb-2">
                  <li className="list-group-item">{showStatus(o)}</li>
                  <li className="list-group-item">
                    <strong>Transaction ID:</strong> {o.transaction_id}
                  </li>
                  <li className="list-group-item">
                    <strong>Amount:</strong> ${o.amount}
                  </li>
                  <li className="list-group-item">
                    <strong>Ordered by:</strong> {o.user.name}
                  </li>
                  <li className="list-group-item">
                    <strong>Ordered on:</strong> {moment(o.createdAt).fromNow()}
                  </li>
                  <li className="list-group-item">
                    <strong>Delivery address:</strong> {o.address}
                  </li>
                </ul>

                <h3 className="mt-4 mb-4 font-italic">
                  Total products in the order: {o.products.length}
                </h3>

                {o.products.map((p, i) => (
                  <div
                    className="mb-4"
                    key={i}
                    style={{ padding: '20px', border: '1px solid indigo' }}
                  >
                    {showInput('Product name', p.name)}
                    {showInput('Product price', p.price)}
                    {showInput('Product total', p.count)}
                    {showInput('Product Id', p._id)}
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}

export default Orders
