import { API } from '../config'
import queryString from 'query-string'

export const getProducts = async (sortBy) => {
  try {
    const response = await fetch(
      `${API}/products?sortBy=${sortBy}&order=desc&limit=6`,
      {
        method: 'GET',
      }
    )
    return response.json()
  } catch (err) {
    return console.log(err)
  }
}

export const getFilteredProducts = async (skip, limit, filters = {}) => {
  const data = {
    limit,
    skip,
    filters,
  }
  try {
    const response = await fetch(`${API}/products/by/search`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return response.json()
  } catch (err) {
    console.log(err)
  }
}

export const list = async (params) => {
  const query = queryString.stringify(params)
  console.log('query', query)

  try {
    const response = await fetch(`${API}/products/search?${query}`, {
      method: 'GET',
    })
    return response.json()
  } catch (err) {
    return console.log(err)
  }
}

export const read = async (productId) => {
  try {
    const response = await fetch(`${API}/product/${productId}`, {
      method: 'GET',
    })
    return response.json()
  } catch (err) {
    return console.log(err)
  }
}
