import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import ImageUpload from '../core/ImageUpload'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth'
import { createAuthor } from '../api/apiAdmin'

const AddCategory = () => {
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [values, setValues] = useState({
    name: '',
    birthPlace: '',
    bio: '',
    photos: [],
  })

  //destructure user and token
  const { user, token } = isAuthenticated()

  const updateImages = (newImages) => {
    setValues({ ...values, photos: newImages })
  }

  const handleChange = (name) => (event) => {
    setError(false)
    setValues({ ...values, [name]: event.target.value })
  }

  const clickSubmit = (e) => {
    e.preventDefault()
    setError(false)
    setLoading(true)
    setSuccess(false)

    createAuthor(user._id, token, values).then((data) => {
      if (data.error) {
        setError(true)
        setLoading(false)
      } else {
        setError(false)
        setSuccess(true)
        setLoading(false)

        alert('Author created')
        window.location.reload()
      }
    })
  }

  const newAuthorForm = (
    <form onSubmit={clickSubmit}>
      <div className="form-group">
        <label className="text-muted">Author name</label>
        <input
          type="text"
          className="form-control"
          onChange={handleChange('name')}
          value={values.name}
          required
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Author birthPlace</label>
        <input
          type="text"
          className="form-control"
          onChange={handleChange('birthPlace')}
          value={values.birthPlace}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Author bio</label>
        <textarea
          type="text"
          className="form-control"
          onChange={handleChange('bio')}
          value={values.bio}
        />
      </div>
      <button className="btn btn-outline-primary">Create Author</button>
    </form>
  )

  const showSuccess = () => {
    if (success) {
      return <h3 className="text-success">Author is created</h3>
    }
  }

  const showError = () => {
    if (error) {
      return <h3 className="text-danger">Error</h3>
    }
  }

  const goBack = (
    <div className="mt-5">
      <Link className="text-warning" to="/admin/dashboard">
        Back to Dashboard
      </Link>
    </div>
  )

  return (
    <Layout
      title="Add a New Author"
      description={`Good day ${user.name}, ready to add a new author`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showError()}
          {showSuccess()}
          {goBack}
          <ImageUpload
            refreshFunction={updateImages}
            userId={user._id}
            token={token}
          />
          <hr />
          {JSON.stringify(values)}
          {newAuthorForm}
        </div>
      </div>
    </Layout>
  )
}

export default AddCategory
