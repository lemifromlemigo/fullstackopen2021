import React, { useState, useEffect } from 'react'
import { Blog } from './components/Blog'
import NewBlogForm from './components/NewBlog'
import Notification from './components/Notification'
import ErrorNotification from './components/NotificationError'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [InfoMessage, setInfoMessage] = useState('')
  const [ErrorMessage, setErrorMessage] = useState('')

  const [newBlogFormVisible, setNewBlogFormVisible] = useState(false)

  useEffect(() => {
    blogService
      .getAll()
      .then(initialblogs =>
        setBlogs(initialblogs)
      )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      console.log(user.token)
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      setUser(user)
      setUsername('')
      setPassword('')
      setErrorMessage('')
      setInfoMessage('')
    } catch (exception) {
      if (!username || !password){
        setErrorMessage('Please enter both username and password.')
      } else {
        setErrorMessage('Username or password incorrect.')
      }
    }

    console.log('logging in with', username, password)
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.clear()
    alert('Logged out.')
  }

  const loginForm = () => (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          Username:
          <input
            type="text"
            value={username}
            name="Username"
            id="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password:
          <input
            type="password"
            value={password}
            name="Password"
            id="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <br/>
        <button type="submit" id="login-button">login</button>
      </form>
    </div>
  )

  const blogList = () => (
    <div>
      <h3>logged in as: {user.name} <button onClick={() => handleLogout()}>Logout</button></h3>
      <br/>
      <h2>Blogs:</h2>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog => {
        return (
          <Blog key={blog.id} blog={blog} user={user} removeBlog={removeBlog} />
        )
      })}
    </div>
  )

  const removeBlog = (blog) => {
    console.log(blog)
    if (window.confirm(`Remove "${blog.title}" ?`)) {
      blogService.remove(blog)
      setBlogs(blogs.filter(function(el) { return el !== blog }))
    }
  }

  const hideWhenVisible = { display: newBlogFormVisible ? 'none' : '' }
  const showWhenVisible = { display: newBlogFormVisible ? '' : 'none' }

  const createBlog = (newBlog) => {
    blogService.create(newBlog)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
    setInfoMessage('New blog added!')
    setNewBlogFormVisible(false)
    setTimeout(function() {
      setInfoMessage('')
    }, 3000)
  }


  return (
    <div>
      <h2>Blog</h2>
      <Notification message={InfoMessage}/>
      <ErrorNotification message={ErrorMessage}/>
      {user === null && loginForm()}
      {user !== null && blogList()}
      <br />
      <br />
      <br />
      {user !== null &&
        <div style={hideWhenVisible}>
          <button onClick={() => setNewBlogFormVisible(true)}>Create new blog</button>
        </div>
      }
      <div style={showWhenVisible}>
        {user !== null &&
          <>
            <NewBlogForm
              createBlog={createBlog}
              setInfoMessage={setInfoMessage}
              setErrorMessage={setInfoMessage}
              setNewBlogFormVisible={setNewBlogFormVisible}/>
            <button onClick={() => setNewBlogFormVisible(false)}>Cancel</button>
          </>
        }
      </div>
    </div>
  )
}

export default App