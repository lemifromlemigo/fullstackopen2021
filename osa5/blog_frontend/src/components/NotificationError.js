import React from 'react'
import '../index.css'

const ErrorNotification = ({ message }) => {
  if (message.length > 0) {
    return (
      <div className="error">
        {message}
      </div>
    )
  }
  return null
}

export default ErrorNotification