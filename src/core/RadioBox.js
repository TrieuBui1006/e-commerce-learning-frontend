import React from 'react'

const RadioBox = ({ prices, handleFilters }) => {
  const handleChange = (e) => {
    handleFilters(e.target.value)
  }

  return prices.map((p, i) => (
    <div key={i}>
      <input
        onChange={handleChange}
        type="radio"
        name={p}
        className="mr-2 ml-4"
        value={`${p._id}`}
      />
      <label className="form-check-label">{p.name}</label>
    </div>
  ))
}

export default RadioBox
