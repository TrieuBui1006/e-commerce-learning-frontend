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
