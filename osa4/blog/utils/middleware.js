const logger = require('./logger')
const User = require('../models/user')
const config = require('../utils/config')
const jwt = require('jsonwebtoken')

// API REQUEST LOGGER
const requestLogger = (req, res, next) => {
  logger.info('Method:', req.method)
  logger.info('Path:  ', req.path)
  logger.info('Body:  ', req.body)
  logger.info('---')
  next()
}

// GET REQUEST TOKEN
const tokenExtractor = (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0].toLowerCase() === 'bearer') {
    req.token = req.headers.authorization.split(' ')[1]
  }

  next()
}

// GET REQUEST USER
const userExtractor = async (req, res, next) => {
  const token = req.token
  const decodedToken = jwt.verify(token, config.SECRET)
  req.user = await User.findById(decodedToken.id)

  if (!token || !req.user) {
    res.status(401).json({ error: 'token missing or invalid' })
  }
  
  next()
}

// NOT FOUND / UNKNOWN API ENDPOINT
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

// ERROR HANDLER
const errorHandler = (error, req, res, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' })
  }

  logger.error(error.message)

  next(error)
}

module.exports = {
  requestLogger,
  tokenExtractor,
  userExtractor,
  unknownEndpoint,
  errorHandler
}