const express = require("express")
const morgan = require('morgan')
require('dotenv').config()

const Person = require('./models/person')

const app = express()

app.use(express.static('dist'))
app.use(express.json())

morgan.token("body", (request) => {
  return JSON.stringify(request.body)
})

app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"))


// Get all persons from the database
app.get("/api/persons", (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})


// Info route
app.get("/info", (request, response) => {
  Person.find({}).then(persons => {
    const currentDate = new Date()

    response.send(`
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${currentDate.toString()}</p>
    `)
  })
})


// Get a single person
app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
})


// Delete a person
app.delete("/api/persons/:id", (request, response) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
})


// Add a person to the database
app.post("/api/persons", (request, response) => {
  const body = request.body

  if (!body || !body.name || !body.number) {
    return response.status(400).json({
      error: "name or number missing"
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    response.status(201).json(savedPerson)
  })
})


const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})