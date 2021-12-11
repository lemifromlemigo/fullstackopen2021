require('dotenv').config()

let PORT = 3003
let MONGODB_URI = 'mongodb+srv://phonebook:K1NieoHsDZQ9KuYD@cluster0.sy4nr.mongodb.net/blog?retryWrites=true&w=majority'

module.exports = {
  MONGODB_URI,
  PORT
}