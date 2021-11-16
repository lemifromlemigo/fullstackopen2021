import React, { useState , useEffect } from 'react'
import personService from './services/persons'


const App = () => {
  const [ contacts, setContacts] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setContacts(response.data)
      })
  })
  console.log('render', contacts.length, 'contacts')

  const handleName = (event) => (setNewName(event.target.value) || console.log(event.target.value))
  const handleNumber = (event) => (setNewNumber(event.target.value) || console.log(event.target.value))

  const handleSubmit = (event) => {
    event.preventDefault()
    if (contacts.map((contact) => contact.name).includes(newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const contact = contacts.find((contact) => (contact === newName))
        console.log(contact)
        personService.remove(contact.id, {'name': newName, 'number': newNumber, 'id': contact.id})
      }
    } 
    else if (newName.length === 0 || newNumber.length === 0) {
      window.alert(`Fields can not be empty!`)
    }
    else {
      personService.create({ name: newName, number: newNumber })
    }

    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>PhoneBook 1.0.0</h2>
      <br />
      <NewContactForm handleSubmit={handleSubmit} newName={newName} handleName={handleName} newNumber={newNumber} handleNumber={handleNumber}/>
      <br />
      <Search data={contacts} setContacts={setContacts}/>
    </div>
  )
}


const NewContactForm = ({ handleSubmit, newName, handleName, newNumber, handleNumber }) => {
  return (
    <>
      <h3>Add new contact:</h3>
      <form onSubmit={handleSubmit}>
        <div>Name: <input value={newName} onChange={handleName} /></div>
        <div>Number: <input value={newNumber} onChange={handleNumber}/></div>
        <div><button type="submit">add</button></div>
      </form>
    </>
  )
}


const Search = ({ data }) => {
  const [ newSearch, setNewSearch ] = useState('')

  const filteredContacts = data.filter(
    person => {
      return (
        person.name.toLowerCase().includes(newSearch.toLowerCase()) || person.number.toLowerCase().includes(newSearch.toLowerCase())
      )
    }
  )

  const handleSearch = (event) => (setNewSearch(event.target.value) || console.log(event.target.value))

  const handleDelete = (contact) => {
    if (window.confirm(`Delete ${contact.name}?`)) {
      personService.remove(contact.id)
    }
  }

  return (
    <>
      <div>
      <h3>Contacts:</h3>
        <div>Filter: <input value={newSearch} onChange={handleSearch}/></div>
      </div>
      <br />
      <div>
        {filteredContacts.map((contact) => {
          return(
            <div key={contact.name}>
              {contact.name}: {contact.number} |
              <button value={contact} onClick={() => handleDelete(contact)}>Delete</button>
            </div>
        )})}
      </div>
    </>

  )
}


export default App