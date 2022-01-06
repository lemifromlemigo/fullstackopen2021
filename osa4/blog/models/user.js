const mongoose = require('mongoose')

// USER MODEL
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 3,
    required: true,
    unique: true
  },
  name: String,
  passwordHash: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
})

// CONVERT TO JSON
userSchema.set('toJSON', {
  transform: (doc, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // The password should not be revealed
    delete returnedObject.passwordHash
  }
})

module.exports = mongoose.model('User', userSchema)