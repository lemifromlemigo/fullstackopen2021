const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// GET ALL BLOGS FROM DB
blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  
  res.json(blogs.map(blog => blog.toJSON()))
})

// ADD NEW BLOG TO DB
blogsRouter.post('/', async (req, res) => {
  const body = req.body
  const user = req.user

  if (body.title && body.url) {
    // Set default likes to 0 if not defined
    if (!body.likes) {
      body.likes = 0
    }

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      user: user,
      likes: body.likes
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()
    
    res.status(201).json(savedBlog.toJSON())
  }
  else {
    res.status(400)
  }
})

// REMOVE BLOG FROM DB
blogsRouter.delete('/:id', async (req, res, next) => {
  const blogid = req.params.id
  const user = req.user

  const blog = await Blog.findById(blogid)
  console.log(blog.user.toString())

  if ( blog.user.toString() === user.id.toString() ){
    try {
      await Blog.findOneAndRemove(blog)
      res.status(204).end()
    } catch (error) {
      next(error)
    }
  }
})

// UPDATE BLOG ON DB
blogsRouter.put('/api/notes/:id', (req, res, next) => {
  const body = req.body

  Blog.findByIdAndUpdate(req.params.id, { content: body.content }, { new: true })
    .then(updatedBlog => {
      res.json(updatedBlog)
    })
    .catch(error => next(error))
})

module.exports = blogsRouter