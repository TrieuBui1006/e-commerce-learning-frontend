import { API } from '../config'

export const signup = async (user) => {
  // console.log(name, email, password)
  try {
    const res = await fetch(`${API}/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    return res.json()
  } catch (err) {
    console.log(err)
  }
}

export const signin = async (user) => {
  // console.log(name, email, password)
  try {
    const res = await fetch(`${API}/signin`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    return res.json()
  } catch (err) {
    console.log(err)
  }
}

export const authenticate = (data, next) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('jwt', JSON.stringify(data))
    next()
  }
}

export const signout = async (next) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('jwt')
    next()
    try {
      const res = await fetch(`${API}/signout`, {
        method: 'GET',
      })
      console.log('signout', res)
    } catch (err) {
      console.log(err)
    }
  }
}

export const isAuthenticated = () => {
  if (typeof window == 'undefined') {
    return false
  }
  if (localStorage.getItem('jwt')) {
    return JSON.parse(localStorage.getItem('jwt'))
  } else {
    return false
  }
}
