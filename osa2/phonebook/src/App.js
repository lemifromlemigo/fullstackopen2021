import React, { useState , useEffect } from 'react'
import axios from 'axios'


const App = () => {
  const [ contacts, setContacts] = useState([
    axios.get('http://localhost:3001/persons')
  ]) 

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const handleName = (event) => (setNewName(event.target.value) || console.log(event.target.value))
  const handleNumber = (event) => (setNewNumber(event.target.value) || console.log(event.target.value))

  const handleSubmit = (event) => {
    event.preventDefault()
    if (contacts.map((contact) => contact.name).includes(newName)) {
      window.alert(`${newName} is already added to phonebook`)
    } 
    else if (newName.length === 0 || newNumber.length === 0) {
      window.alert(`Fields can not be empty!`)
    }
    else {
      setContacts(contacts.concat({ name: newName, number: newNumber })) || console.log('Added:', event.target)
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
      <Search data={contacts}/>
    </div>
  )
}


const NewContactForm = ({ handleSubmit, newName, handleName, newNumber, handleNumber }) => {
  return (
    <div>
      <h3>Add new contact:</h3>
      <form onSubmit={handleSubmit}>
        <div>Name: <input value={newName} onChange={handleName} /></div>
        <div>Number: <input value={newNumber} onChange={handleNumber}/></div>
        <div><button type="submit">add</button></div>
      </form>
    </div>
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

  return (
    <div>
      <div>
      <h3>Contacts:</h3>
        <div>Filter: <input value={newSearch} onChange={handleSearch}/></div>
      </div>
      <br />
      <div>
        {filteredContacts.map((contact) => <div key={contact.name}>{contact.name}: {contact.number}</div>)}
      </div>
    </div>

  )
}


export default App