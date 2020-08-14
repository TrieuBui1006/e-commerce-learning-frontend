import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import { getProducts } from '../api/apiCore'
import Card from './Card'
import Search from './Search'

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([])
  const [productsByArrival, setProductsByArrival] = useState([])
  const [error, setError] = useState(false)

  const loadProductsBySell = () => {
    getProducts('sold').then((data) => {
      if (data.error) {
        setError(data.error)
      } else {
        setProductsBySell(data)
      }
    })
  }

  const loadProductsByArrival = () => {
    getProducts('createdAt').then((data) => {
      if (data.error) {
        setError(data.error)
      } else {
        setProductsByArrival(data)
      }
    })
  }

  const showError = (
    <div
      className="alert alert-danger"
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  )

  useEffect(() => {
    loadProductsByArrival()
    loadProductsBySell()
  }, [])

  return (
    <Layout
      title="Home Page"
      description="Node React E-Commerce"
      className="container-fluid"
    >
      {showError}
      <Search />
      <h2 className="mb-4">New Arrivals</h2>
      <div className="row">
        {productsByArrival.map((product, i) => (
          <div className="col-3 mb-3" key={i}>
            <Card product={product} />
          </div>
        ))}
      </div>

      <h2 className="mb-4">Best Sellers</h2>
      <div className="row ">
        {productsBySell.map((product, i) => (
          <div className="col-3 mb-3" key={i}>
            <Card product={product} />
          </div>
        ))}
      </div>
    </Layout>
  )
}

export default Home
