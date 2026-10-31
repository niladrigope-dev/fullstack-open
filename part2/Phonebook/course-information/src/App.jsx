import { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = ({search,handleNewSearch}) => {
  return (
    <div>
      filter shown with <input value = {search} onChange = {handleNewSearch} />
    </div>
  )
}

const PersonForm = ({addPersons, newName, handleNewName, newNumber, handleNewNumber}) =>{
  return(
      <form onSubmit = {addPersons}>
        <div>
          name: <input value = {newName} onChange = {handleNewName}/>
        </div>
        <div>
          number: <input value = {newNumber} onChange = {handleNewNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Persons = ({persons, handleDelete}) => {
  return(      
      <div>
        <h2>Numbers</h2>
        <ul>
          {
            persons.map((person) => (
              <li key = {person.id} >
                {person.name} {person.number} <button onClick = {() => handleDelete(person.id)}>delete</button>
              </li>
            ))
          }
        </ul>
      </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 

  useEffect (() => {
    personService
      .getAll()
      .then(initialPersons => {
        console.log("promise fulfilled")
        setPersons(initialPersons)
      })
  },[])

  
  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [search, setSearch] = useState("")

  const addPersons = (event) => {
    event.preventDefault()
    

    const existingPerson = persons.find(person => person.name === newName)
    
    if (existingPerson){
      const confirmUpdate = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )
      if (confirmUpdate) {
        personService
          .update(existingPerson.id,{
            ...existingPerson,
            number: newNumber
          })
          .then(updatePerson => {
            setPersons(prevPersons =>
              prevPersons.map(person =>
                person.id === updatePerson.id ? updatePerson : person
              )
            )
            setNewName("")
            setNewNumber("")
          })
      }
    }

    const personObject = {
      name: newName,
      number: newNumber,
      
    }
    personService
      .create(personObject)
      .then(returnedPerson => {
        console.log(returnedPerson)
        setPersons(prevPersons => prevPersons.concat(returnedPerson))
        setNewName("")
        setNewNumber("")
      })
  }
  
  const handleNewName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleNewSearch = (event) => {
    console.log(event.target.value)
    setSearch(event.target.value)
  }

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleDelete = (id) => {
    const person = persons.find(person => person.id === id)

    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(prevpersons => prevpersons.filter(person => person.id != id))
        })
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search = {search} handleNewSearch = {handleNewSearch}/>
      <h2>add a new</h2>
      <PersonForm
        addPersons={addPersons}
        newName = {newName}
        handleNewName = {handleNewName}
        newNumber = {newNumber}
        handleNewNumber={handleNewNumber}
      />
    <Persons 
      persons={personsToShow}
      handleDelete={handleDelete} 
    />
    </div>
  )
}

export default App
