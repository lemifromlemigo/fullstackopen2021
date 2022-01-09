import React, { useState } from 'react'
import PropTypes from 'prop-types'
import '../index.css'

const NewBlogForm = ({ createBlog }) => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitle = (event) => setNewTitle(event.target.value)
  const handleAuthor = (event) => setNewAuthor(event.target.value)
  const handleUrl = (event) => setNewUrl(event.target.value)

  const handleNewBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <>
      <h2>Create new blog</h2>
      <form id='newform' onSubmit={handleNewBlog}>
        <p>Title: <input type="text" id='title' value={newTitle} name="Title" onChange={handleTitle}/></p>
        <p>Author: <input type="text" id='author' value={newAuthor} name="Author" onChange={handleAuthor}/></p>
        <p>Url: <input type="text" id='url' value={newUrl} name="Url" onChange={handleUrl}/></p>
        <br/>
        <button type="submit" id="create_newblog">Create</button>
      </form>
    </>
  )
}

NewBlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default NewBlogForm