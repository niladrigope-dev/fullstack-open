import { useState } from 'react'

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

const Persons = ({persons}) => {
  return(      
      <div>
        <h2>Numbers</h2>
        <ul>
          {
            persons.map((person) => (
              <li key = {person.id} >
                {person.name} {person.number}
              </li>
            ))
          }
        </ul>
      </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [search, setSearch] = useState("")

  const addPersons = (event) => {
    event.preventDefault()
    if(persons.some(person => person.name === newName)){
      alert(`${newName} is already added to phonebook`)
      return
    }

    const personObject = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1)
    }
    setPersons(persons.concat(personObject))
    setNewName("")
    setNewNumber("")
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
    <Persons persons={personsToShow} />
    </div>
  )
}

export default App
