import React, { useState } from 'react'

const Checkbox = ({ categories, handleFilters }) => {
  const [checked, setChecked] = useState([])

  const handleToggle = (id) => () => {
    const currentCategoryId = checked.indexOf(id)
    const newCheckedCategoryId = [...checked]

    if (currentCategoryId === -1) {
      newCheckedCategoryId.push(id)
    } else {
      newCheckedCategoryId.splice(currentCategoryId, 1)
    }

    // console.log(newCheckedCategoryId)
    setChecked(newCheckedCategoryId)
    handleFilters(newCheckedCategoryId)
  }

  return categories.map((c, i) => (
    <li className="list-unstyled" key={i}>
      <input
        onChange={handleToggle(c._id)}
        type="checkbox"
        className="form-check-input"
        value={checked.indexOf(c._id === -1)}
      />
      <label className="form-check-label">{c.name}</label>
    </li>
  ))
}

export default Checkbox
