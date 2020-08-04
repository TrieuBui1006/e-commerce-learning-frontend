import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import { getCategories } from '../admin/apiAdmin'
import { getFilteredProducts } from './apiCore'

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
  const [limit, setLimit] = useState(6)
  const [skip, setSkip] = useState(0)
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

  const loadFilteredResults = (newFilter) => {
    getFilteredProducts(skip, limit, newFilter).then((data) => {
      if (data.error) {
        setError(data.error)
      } else {
        setFilteredResults(data.data)
      }
    })
  }

  useEffect(() => {
    init()
    loadFilteredResults(skip, limit, myFilters.filters)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleFilters = (filters, filterBy) => {
    // console.log('SHOP', filters, filterBy)
    const newFilter = { ...myFilters }
    newFilter.filters[filterBy] = filters

    if (filterBy === 'price') {
      let priceValues = handlePrice(filters)
      newFilter.filters[filterBy] = priceValues
    }

    loadFilteredResults(myFilters.filters)
    setMyFilters(newFilter)
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

  return (
    <Layout
      title="Shop Page"
      description="Search and find books of your choice"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-4">
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

        <div className="col-8">
          <h2 className="mb-4">Products</h2>
          <div className="row">
            {filteredResults.map((product, i) => (
              <Card product={product} key={i} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Shop
