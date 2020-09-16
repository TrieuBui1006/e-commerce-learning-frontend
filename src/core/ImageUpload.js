import React, { useState } from 'react'
import Dropzone from 'react-dropzone'

import { uploadAuhthorImage } from '../api/apiAdmin'

function ImageUpload({ refreshFunction, userId, token }) {
  const [images, setImages] = useState([])

  const onDrop = (files) => {
    let formData = new FormData()

    formData.append('file', files[0])
    //save the Image we chose inside the Node Server
    uploadAuhthorImage(userId, token, formData).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setImages([...images, data])
        refreshFunction([...images, data])
      }
    })
  }

  const onDelete = (image) => {
    const currentIndex = images.indexOf(image)

    let newImages = [...images]
    newImages.splice(currentIndex, 1)

    setImages(newImages)
    refreshFunction(newImages)
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
        {({ getRootProps, getInputProps }) => (
          <div
            style={{
              width: '300px',
              height: '240px',
              border: '1px solid lightgray',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            {...getRootProps()}
          >
            {console.log('getRootProps', { ...getRootProps() })}
            {console.log('getInputProps', { ...getInputProps() })}
            <input {...getInputProps()} />
          </div>
        )}
      </Dropzone>

      <div
        style={{
          display: 'flex',
          width: '350px',
          height: '240px',
          overflowX: 'scroll',
        }}
      >
        {images.map((image, index) => (
          <div onClick={() => onDelete(image)} key={index}>
            <img
              style={{ minWidth: '300px', width: '300px', height: '240px' }}
              src={image.url}
              alt={`productImg-${index}`}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ImageUpload
