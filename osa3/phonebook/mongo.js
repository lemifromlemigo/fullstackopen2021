const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');

const password = process.argv[2]

const url = `mongodb+srv://phonebook:${password}@cluster0.sy4nr.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url)

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  number: { type: String, required:true, unique: true },
  important: Boolean,
})

contactSchema.plugin(uniqueValidator)
  
const Contact = mongoose.model('Contact', contactSchema)

if (process.argv.length === 3) {
  console.log('Phonebook:')
  Contact.find({}).then(result => {
    result.forEach(contact => {
      console.log(contact.name, contact.number)
    })
    mongoose.connection.close()
    process.exit(1)
  })
}

let name_argv = 'Empty'
let number_argv = 'Empty'

process.argv.forEach((value, index) => {
  if (index === 3) {
    name_argv = value
  }
  else if (index === 4) {
    number_argv = value
  }
})

const contact = new Contact({
  name: name_argv,
  number: number_argv,
  important: true,
})

contact.save().then(() => {
  console.log(`added ${name_argv} number ${number_argv} to phonebook`)
  mongoose.connection.close()
})