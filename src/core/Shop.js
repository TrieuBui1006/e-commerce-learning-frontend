import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import { getCategories } from '../api/apiAdmin'
import { getFilteredProducts } from '../api/apiCore'

import Card from './Card'
import Checkbox from './Checkbox'
import RadioBox from './RadioBox'
import { prices } from './fixedPrices'

const Shop = () => {
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  })
  const [categories, setCategories] = useState([])
  const [error, setError] = useState(false)
  // const [limit, setLimit] = useState(6)
  let limit = 6
  const [skip, setSkip] = useState(0)
  const [size, setSize] = useState(0)
  const [filteredResults, setFilteredResults] = useState([])

  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error)
      } else {
        setCategories(data)
      }
    })
  }

  const loadFilteredResults = (newFilters) => {
    // console.log(newFilters);
    getFilteredProducts(0, limit, newFilters).then((data) => {
      if (data.error) {
        setError(data.error)
      } else {
        setFilteredResults(data.data)
        setSize(data.size)
        setSkip(0)
      }
    })
  }

  const loadMore = () => {
    let toSkip = skip + limit
    // console.log(newFilters);
    getFilteredProducts(toSkip, limit, myFilters.filters).then((data) => {
      if (data.error) {
        setError(data.error)
      } else {
        setFilteredResults([...filteredResults, ...data.data])
        setSize(data.size)
        setSkip(toSkip)
      }
    })
  }

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={loadMore} className="btn btn-warning mb-5">
          Load more
        </button>
      )
    )
  }

  useEffect(() => {
    init()
    loadFilteredResults(skip, limit, myFilters.filters)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleFilters = (filters, filterBy) => {
    const newFilters = { ...myFilters }
    newFilters.filters[filterBy] = filters

    if (filterBy === 'price') {
      let priceValues = handlePrice(filters)
      newFilters.filters[filterBy] = priceValues
    }
    loadFilteredResults(myFilters.filters)
    setMyFilters(newFilters)
  }

  const handlePrice = (value) => {
    const data = prices
    let array = []

    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array
      }
    }
    return array
  }

  const showError = (
    <div
      className="alert alert-danger"
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  )

  return (
    <Layout
      title="Shop Page"
      description="Search and find books of your choice"
      className="container-fluid"
    >
      {showError}
      <div className="row">
        <div className="col-3">
          <h4>Filter by categories</h4>
          <ul>
            <Checkbox
              categories={categories}
              handleFilters={(filters) => handleFilters(filters, 'category')}
            />
          </ul>

          <h4>Filter by price range</h4>
          <div>
            <RadioBox
              prices={prices}
              handleFilters={(filters) => handleFilters(filters, 'price')}
            />
          </div>
        </div>

        <div className="col-9">
          <h2 className="mb-4">Products</h2>
          <div className="row">
            {filteredResults.map((product, i) => (
              <div className="col-4 mb-3" key={i}>
                <Card product={product} />
              </div>
            ))}
          </div>
          <hr />
          {loadMoreButton()}
        </div>
      </div>
    </Layout>
  )
}

export default Shop
