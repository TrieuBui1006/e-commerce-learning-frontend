import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import DropIn from 'braintree-web-drop-in-react'

import { isAuthenticated } from '../auth'
import { getBraintreeClientToken, processPayment, createOrder } from './apiCore'
import { emptyCart } from './cartHelpers'

const Checkout = ({ products, setRun = (f) => f, run = undefined }) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: '',
    instance: {},
    address: '',
  })

  const userId = isAuthenticated() && isAuthenticated().user._id
  const token = isAuthenticated() && isAuthenticated().token

  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then((response) => {
      if (response.error) {
        setData({ ...data, error: response.error })
      } else {
        setData({ clientToken: response.clientToken })
      }
    })
  }

  useEffect(() => {
    getToken(userId, token)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleAddress = (event) => {
    // console.log(event.target.value)
    setData({ ...data, address: event.target.value })
  }

  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price
    }, 0)
  }

  const showCheckout = () => {
    return isAuthenticated() ? (
      <div>{showDropIn()}</div>
    ) : (
      <Link to="/signin">
        <button className="btn btn-primary">Sign in to Checkout</button>
      </Link>
    )
  }

  const buy = () => {
    setData({ ...data, loading: true })
    let nonce
    let getNonce = data.instance
      .requestPaymentMethod()
      .then((response) => {
        nonce = response.nonce
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotal(products),
        }

        processPayment(userId, token, paymentData)
          .then((response) => {
            // console.log(response)

            const createOrderData = {
              products: products,
              transaction_id: response.transaction.id,
              amount: response.transaction.amount,
              address: data.address,
            }

            createOrder(userId, token, createOrderData)
              .then((response) => {
                emptyCart(() => {
                  setRun(!run)
                  console.log('payment success and empty cart')
                  setData({ loading: false, success: true })
                })
              })
              .catch((error) => {
                console.log(error)
                setData({ loading: false })
              })
          })
          .catch((error) => {
            console.log(error)
            setData({ loading: false })
          })
      })
      .catch((error) => {
        console.log('dropin error', error)
        setData({ ...data, error: error.message })
      })
  }

  const showDropIn = () => (
    <div onBlur={() => setData({ ...data, error: '' })}>
      {data.clientToken !== null && products.length > 0 ? (
        <div>
          <div className="grom-group mb-3">
            <label className="text-muted">Delivery address</label>
            <textarea
              onChange={handleAddress}
              className="form-control"
              value={data.address}
              placeholder="Type your delivery address here ..."
            />
          </div>
          <div>
            <DropIn
              options={{
                authorization: data.clientToken,
                paypal: {
                  flow: 'vault',
                },
              }}
              onInstance={(instance) => (data.instance = instance)}
            />
            <button className="btn btn-success btn-block" onClick={buy}>
              Pay
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )

  const showError = (error) => (
    <div
      className="alert alert-danger"
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  )

  const showSuccess = (success) => (
    <div
      className="alert alert-info"
      style={{ display: success ? '' : 'none' }}
    >
      Thanks! Your payment was successful!
    </div>
  )

  const showLoading = (loading) => loading && <h2>Loading...</h2>

  return (
    <div>
      <h2>Total: ${getTotal()}</h2>
      {showLoading(data.loading)}
      {showSuccess(data.success)}
      {showError(data.error)}
      {showCheckout()}
    </div>
  )
}

export default Checkout
