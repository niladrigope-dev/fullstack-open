const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as a command-line argument.')
  process.exit(1)
}

const password = encodeURIComponent(process.argv[2])

const url = `mongodb+srv://phonebook-backend-manager-ng:${password}@cluster0.kf43jyp.mongodb.net/PhonebookFriend?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  Person.find({}).then(persons => {
    console.log('phonebook:')
    persons.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}

if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })

  person.save().then(result => {
    console.log(`added ${result.name} number ${result.number} to phonebook`)
    mongoose.connection.close()
  })
}