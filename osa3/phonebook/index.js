const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const date = new Date()
const Book = require('./models/book')
var morgan = require('morgan')

app.use(express.static('build'))
app.use(cors())
app.use(express.json())

morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
require('dotenv').config()


const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

const requestLogger = (req, res, next) => {
  console.log('Method:', req.method)
  console.log('Path:  ', req.path)
  console.log('Body:  ', req.body)
  console.log('---')
  next()
}

app.use(requestLogger)


app.get('/api/persons', (req, res) => {
  Book.find({}).then(result => {
    res.json(result)
  })
})


app.post('/api/persons', (req, res, next) => {
  const body = req.body
  
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'name or number missing'
    })
  } else if (Book.find({ name: body.name }).length > 0) {
    return res.status(400).json({
      error: 'name must be unique'
    })
  }

  const contact = new Book({
    name: body.name,
    number: body.number,
    important: body.important || false
  })
  
  contact.save()
    .then(savedContact => savedContact.toJSON())
    .then(savedAndFormattedContact => {
      res.json(savedAndFormattedContact)
    })
    .catch(error => next(error))
})


app.get('/api/persons/:id', (req, res, next) => {
  Book.findById(req.params.id)
    .then(result => {
      if (result) {
        res.json(result)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => {
      next(error)
    })
})


app.delete('/api/persons/:id', (req, res, next) => {
  Book.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => next(error))
})


app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  const contact = {
    name: body.name,
    number: body.number,
    important: body.important || true
  }

  Book.findByIdAndUpdate(req.params.id, contact, { new: true })
    .then(updatedContact => {
      res.json(updatedContact)
    })
    .catch(error => next(error))
})


app.get('/info', (req, res) => {
  res.send(`<div>Phonebook has ${Book.find({}).length} contacts.</div><br><div>${date}</div>`)
})


const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})