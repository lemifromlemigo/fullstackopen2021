require('dotenv').config()

const PORT = 3003
const MONGODB_URI = 'mongodb+srv://phonebook:K1NieoHsDZQ9KuYD@cluster0.sy4nr.mongodb.net/blog?retryWrites=true&w=majority'
const SECRET = 'sjsyebctg52jd734jfdsf9je6232fjdsfi34jsfj'

module.exports = {
  MONGODB_URI,
  PORT,
  SECRET
}