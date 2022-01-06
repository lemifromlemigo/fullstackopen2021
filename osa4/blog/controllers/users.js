const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

// GET ALL USERS FROM DB
usersRouter.get('/', async (req, res) => {
  const users = await User
    .find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
    
  res.json(users.map(u => u.toJSON()))
})

// ADD NEW USER
usersRouter.post('/', async (req, res, next) => {
  const body = req.body

  if (body === undefined) {
    return res.status(400).json({ error: 'content missing' })
  }
  if (body.password.length < 3) {
    return res.status(400).json({ error: 'password must be atleast 3 long '})
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)
  
  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })

  try {
    const savedUser = await user.save()
    res.json(savedUser)
  } catch (err) {
    console.log(err)
    next(err)
  }
})

module.exports = usersRouter