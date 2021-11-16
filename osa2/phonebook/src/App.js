import React, { useState , useEffect } from 'react'
import personService from './services/persons'

const App = () => {
  const [ contacts, setContacts] = useState([]) 
  const [ getcontacts, setGetcontacts ] = useState(false)

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setContacts(response.data)
      })
  }, [getcontacts])

  return (
    <>
      <SubApp contacts={contacts} setGetcontacts={setGetcontacts} />
    </>
  )
}

const SubApp = ({ contacts, setGetcontacts }) => {
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newMessage, setMessage ] = useState('')
  const [ newMessageError, setMessageError ] = useState('')

  const handleName = (event) => (setNewName(event.target.value) || console.log(event.target.value))
  const handleNumber = (event) => (setNewNumber(event.target.value) || console.log(event.target.value))

  const handleSubmit = (event) => {
    event.preventDefault()
    if (contacts.map((contact) => contact.name).includes(newName)) {

      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        console.log(contacts)
        const contact = contacts.filter((contact) => contact.name === newName)[0]
        console.log(contact)

        personService.update(contact.id, { name: contact.name, number: newNumber, id: contact.id })
          .then(response => {
            setMessage(`Changed ${newName}'s number to ${newNumber}`)
            setTimeout(function() {
              setGetcontacts(prev => !prev)
            }, response.length > 0)
            setTimeout(function() {
              setMessage('')
            },  2000);
          })
      }
    } 
    else if (newName.length === 0 || newNumber.length === 0) {
      window.alert(`Fields can not be empty!`)
    }
    else {
      personService.create({ name: newName, number: newNumber }).then(response => {
        setMessage(`Added: ${newName}`)
        setTimeout(function() {
          setGetcontacts(prev => !prev)
        }, response.length > 0)
        setTimeout(function() {
          setMessage('')
        }, 2000);
      })
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>PhoneBook 1.0.0</h2>
      <br />
      <NewContactForm handleSubmit={handleSubmit} newName={newName} handleName={handleName}
      newNumber={newNumber} handleNumber={handleNumber} message={newMessage} messageError={newMessageError} />
      <br />
      <Search data={contacts} setMessage={setMessage} 
      setMessageError={setMessageError} setGetcontacts={setGetcontacts} />
    </div>
  )
}


const InfoMessage = ({ message }) => {
  if (message.length > 0) {
    return (
      <div className='msg'>{message}</div>
    )
  } else {
    return (<></>)
  }

}

const ErrorMessage = ({ message }) => {
  if (message.length > 0) {
    return (
      <div className='msgError'>{message}</div>
    )
  } else {
    return (<></>)
  }

}


const NewContactForm = ({ handleSubmit, newName, handleName,
  newNumber, handleNumber, message, messageError }) => {
  return (
    <>
      <ErrorMessage message={messageError} />
      <InfoMessage message={message} />
      <h3>Add new contact:</h3>
      <form onSubmit={handleSubmit}>
        <div>Name: <input value={newName} onChange={handleName} /></div>
        <div>Number: <input value={newNumber} onChange={handleNumber}/></div>
        <div><button type="submit">add</button></div>
      </form>
    </>
  )
}


const Search = ({ data, setMessage, setMessageError, setGetcontacts }) => {
  const [ newSearch, setNewSearch ] = useState('')

  const filteredContacts = data.filter(
    person => {
      return (
        person.name.toLowerCase().includes(newSearch.toLowerCase())
        || person.number.toLowerCase().includes(newSearch.toLowerCase())
      )
    }
  )

  const handleSearch = (event) => (setNewSearch(event.target.value) || console.log(event.target.value))

  const handleDelete = (contact) => {
    if (window.confirm(`Delete ${contact.name}?`)) {
      personService.remove(contact.id)
        .then(response => {
          console.log('Deleted!')
          setMessage(`Removed ${contact.name}`) 
          setTimeout(function() {
            setGetcontacts(prev => !prev)
          }, response.length > 0)
        })
      .catch(error => {
        console.log('ERROR!')
        setMessageError(`Information of ${contact.name} has already been removed from the server!`)
        setTimeout(function() {
          setGetcontacts(prev => !prev)
        }, error.length > 0)
      })
    }
    setTimeout(function() {
      setMessageError('')
      setMessage('')
    },  2000);
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