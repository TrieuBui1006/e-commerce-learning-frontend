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
