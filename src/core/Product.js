import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import { read, listRelated } from '../core/apiCore'
import Card from './Card'

const Product = (props) => {
  const [product, setProduct] = useState({})
  const [relatedProduct, setRelatedProduct] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  // const loadSingleProduct = (productId) => {
  //   read(productId).then((data) => {
  //     if (data.error) {
  //       setError(data.error)
  //     } else {
  //       setProduct(data)
  //       //fetch related products
  //       listRelated(data._id).then((data) => {
  //         if (data.error) {
  //           setError(data.error)
  //         } else {
  //           setRelatedProduct(data)
  //         }
  //       })
  //     }
  //   })
  // }

  const loadSingleProduct = async (productId) => {
    setLoading(true)
    try {
      const product = await read(productId)
      setProduct(product)
      try {
        const relatedProduct = await listRelated(product._id)
        setRelatedProduct(relatedProduct)
        setLoading(false)
      } catch (error) {
        setError(error)
        setLoading(false)
      }
    } catch (error) {
      setError(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    const productId = props.match.params.productId
    loadSingleProduct(productId)
  }, [props])

  const showError = (
    <div
      className="alert alert-danger"
      style={{ display: error ? '' : 'none' }}
    >
      Network Error!
    </div>
  )

  return (
    <Layout
      title={product && product.name}
      description={
        product && product.description && product.description.substring(0, 100)
      }
      className="container-fluid"
    >
      {showError}
      {loading && <h3>Loading...</h3>}
      <div className="row">
        <div className="col-8">
          {product && product.description && (
            <Card product={product} showViewProductButton={false} />
          )}
        </div>
        <div className="col-4">
          <h4>Related Products</h4>
          {relatedProduct.map((p, i) => (
            <div className="mb-3" key={i}>
              <Card product={p} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Product
