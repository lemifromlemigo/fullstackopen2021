import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'
import '../index.css'


const Blog = ({ blog, user, removeBlog }) => {
  const [likes, setLikes] = useState(blog.likes)
  return (Blog_rend({ blog, user, removeBlog, likes, setLikes }))
}

const Blog_rend = ({ blog, user, removeBlog, likes, setLikes }) => {

  const [showDetails, setShowDetails] = useState(false)

  const handleView = (event) => {
    event.preventDefault()
    setShowDetails(!showDetails)
  }

  const handleLike = (event) => {
    event.preventDefault()
    blogService.likeBlog(blog)
    setLikes(likes+1)
  }

  const handleRemove = (event) => {
    event.preventDefault()
    removeBlog(blog)
  }


  return (
    <div className='blog_box'>
      <div className='blog_content'>
        <h3>{blog.title} <button onClick={handleView} className='viewbutton'>View</button>
          {user.username === blog.user.username &&
            <button onClick={handleRemove} className='removebutton'>Remove</button>
          }
        </h3>
        <p>________________________________________</p>
        {showDetails === true &&
          <div>
            <p>Author: {blog.author}</p>
            <p>www: {blog.url}</p>
            <p className='likescount'>{blog.likes}</p>
            <button onClick={handleLike}>Like</button>
          </div>
        }
        <br/>
        <br/>
      </div>
    </div>
  )
}


Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  blogs: PropTypes.array,
  setBlogs: PropTypes.func
}

Blog_rend.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  blogs: PropTypes.array,
  setBlogs: PropTypes.func,
  likes: PropTypes.number,
  setLikes: PropTypes.func
}

export { Blog, Blog_rend }