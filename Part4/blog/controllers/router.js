const Router = require('express').Router()
const Content = require('../models/mongo')
const logger = require('../utils/logger')

Router.get('/', (req, res) => {
  Content
    .find({})
    .then(blogs => {
      logger.info(blogs)
      res.json(blogs)
    })
})
Router.post('/', (req, res) => {
  Content(req.body)
    .save()
    .then(result => {
      res.status(201).json(result)
    })
})

module.exports = Router