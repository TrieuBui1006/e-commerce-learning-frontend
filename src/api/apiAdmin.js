import { API } from '../config'

export const createCategory = async (userId, token, category) => {
  // console.log(name, email, password)
  try {
    const res = await fetch(`${API}/category/create/${userId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(category),
    })
    return res.json()
  } catch (err) {
    console.log(err)
  }
}

export const getCategories = async () => {
  try {
    const response = await fetch(`${API}/categories`, {
      method: 'GET',
    })
    return response.json()
  } catch (err) {
    return console.log(err)
  }
}

export const listOrders = async (userId, token) => {
  try {
    const response = await fetch(`${API}/order/list/${userId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    return response.json()
  } catch (err) {
    return console.log(err)
  }
}

export const getStatusValues = async (userId, token) => {
  try {
    const response = await fetch(`${API}/order/status-values/${userId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    return response.json()
  } catch (err) {
    return console.log(err)
  }
}

export const updateStatusValues = async (userId, token, orderId, status) => {
  try {
    const response = await fetch(`${API}/order/${orderId}/status/${userId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status, orderId }),
    })
    return response.json()
  } catch (err) {
    return console.log(err)
  }
}

// to perform curd on product

export const createProduct = async (userId, token, product) => {
  // console.log(name, email, password)
  try {
    const res = await fetch(`${API}/product/create/${userId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: product,
    })
    return res.json()
  } catch (err) {
    console.log(err)
  }
}

export const getProducts = async () => {
  try {
    const response = await fetch(`${API}/products?limit=undefined`, {
      method: 'GET',
    })
    return response.json()
  } catch (err) {
    return console.log(err)
  }
}

export const deleteProduct = async (productId, userId, token) => {
  try {
    const response = await fetch(`${API}/product/${productId}/${userId}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    return response.json()
  } catch (err) {
    return console.log(err)
  }
}

export const getProduct = async (productId) => {
  try {
    const response = await fetch(`${API}/product/${productId}`, {
      method: 'GET',
    })
    return response.json()
  } catch (err) {
    return console.log(err)
  }
}

export const updateProduct = async (productId, userId, token, product) => {
  try {
    const response = await fetch(`${API}/product/${productId}/${userId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: product,
    })
    return response.json()
  } catch (err) {
    return console.log(err)
  }
}

// Author CRUD

export const createAuthor = async (userId, token, author) => {
  console.log(author)
  try {
    const res = await fetch(`${API}/author/create/${userId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(author),
    })
    return res.json()
  } catch (err) {
    console.log(err)
  }
}

export const uploadAuhthorImage = async (userId, token, file) => {
  try {
    const res = await fetch(`${API}/author/upload/${userId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: file,
    })
    return res.json()
  } catch (err) {
    console.log(err)
  }
}
