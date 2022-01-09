import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const config = {
    headers: { Authorization: token }
  }

  const req = axios.get(baseUrl, config)
  return req.then(res => res.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }

  const res = await axios.post(baseUrl, newObject, config)
  return res.data
}

const likeBlog = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }
  blog.likes += 1

  const newBlog = blog

  const res = await axios.put(`${baseUrl}/${blog.id}`, newBlog, config)
  return res.data
}

const remove = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }

  const res = await axios.delete(`${baseUrl}/${blog.id}`, config)
  return res.data
}

export default { getAll, setToken, create, likeBlog, remove }