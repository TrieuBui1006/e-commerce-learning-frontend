import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import Layout from '../core/Layout'
import { isAuthenticated } from '../auth'
import { createCategory } from './apiAdmin'

const ManageProducts = () => {
  return (
    <Layout
      title="Manage Products"
      description="Perform CURD on products"
      className="container-fluid"
    >
      <div className="row">
        <div>...</div>
      </div>
    </Layout>
  )
}

export default ManageProducts
