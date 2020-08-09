import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import DropIn from 'braintree-web-drop-in-react'

import { isAuthenticated } from '../auth'
import { getBraintreeClientToken, processPayment } from './apiCore'

const Checkout = ({ products, setRun = (f) => f, run = undefined }) => {
  const [data, setData] = useState({
    success: false,
    clientToken: null,
    error: '',
    instance: {},
    adress: '',
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
  }, [])

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
    let nonce
    let getNonce = data.instance
      .requestPaymentMethod()
      .then((data) => {
        // console.log(data)
        nonce = data.nonce

        // console.log(
        //   'send nonce and total to process:',
        //   nonce,
        //   getTotal(products)
        // )
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotal(products),
        }

        processPayment(userId, token, paymentData)
          .then((response) => {
            // console.log(response)
            setData({ ...data, success: response.success })
          })
          .catch((error) => {
            console.log(error)
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
          <DropIn
            options={{
              authorization: data.clientToken,
            }}
            onInstance={(instance) => (data.instance = instance)}
          />
          <button className="btn btn-success btn-block" onClick={buy}>
            Pay
          </button>
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

  return (
    <div>
      <h2>Total: ${getTotal()}</h2>
      {showSuccess(data.success)}
      {showError(data.error)}
      {showCheckout()}
    </div>
  )
}

export default Checkout
