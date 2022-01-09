import React from 'react'
import '../index.css'

const Notification = ({ message }) => {
  if (message.length > 0) {
    return (
      <div className="info">
        {message}
      </div>
    )
  }
  return null
}

export default Notification