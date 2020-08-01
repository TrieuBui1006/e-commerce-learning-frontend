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
