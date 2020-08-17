import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import ImageUpload from '../core/ImageUpload'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth'

const AddCategory = () => {
  const [images, setImages] = useState([])
  //   const [error, setError] = useState(false)
  //   const [success, setSuccess] = useState(false)

  //destructure user and token
  const { user, token } = isAuthenticated()

  const updateImages = (newImages) => {
    setImages(newImages)
  }
  //   const handleChange = (e) => {
  //     setError('')
  //     setName(e.target.value)
  //   }

  //   const clickSubmit = (e) => {
  //     e.preventDefault()
  //     setError('')
  //     setSuccess(false)
  //     createCategory(user._id, token, { name }).then((data) => {
  //       if (data.error) {
  //         setError(true)
  //       } else {
  //         setError('')
  //         setSuccess(true)
  //       }
  //     })
  //   }

  //   const newCategoryForm = (
  //     <form onSubmit={clickSubmit}>
  //       <div className="form-group">
  //         <label className="text-muted">Category name</label>
  //         <input
  //           type="text"
  //           className="form-control"
  //           onChange={handleChange}
  //           value={name}
  //           autoFocus
  //           required
  //         />
  //       </div>
  //       <button className="btn btn-outline-primary">Create Category</button>
  //     </form>
  //   )

  //   const showSuccess = () => {
  //     if (success) {
  //       return <h3 className="text-success">{name} is created</h3>
  //     }
  //   }

  //   const showError = () => {
  //     if (error) {
  //       return <h3 className="text-danger">Category should be unique</h3>
  //     }
  //   }

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
          {/* {showError()}
          {showSuccess()}
          {newCategoryForm}
          {goBack} */}
          <ImageUpload
            refreshFunction={updateImages}
            userId={user._id}
            token={token}
          />
        </div>
      </div>
    </Layout>
  )
}

export default AddCategory
