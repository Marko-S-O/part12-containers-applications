const mongoose = require('mongoose')
const personSchema = new mongoose.Schema({
  name: String,
  number: String
})
const Person = mongoose.model('Person', personSchema)

const MONGO_URL = process.env.MONGO_URL || 'mongodb://root:example@localhost:3456/the_database?authSource=admin';

console.log('MONGO_URL: ' + MONGO_URL)

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const url = MONGO_URL

mongoose.connect(url)
mongoose.set('strictQuery', false)

const save = (name, number) => {
  const person = new Person({
    name: name,
    number: number
  })
  // eslint-disable-next-line  
  person.save().then(result => {
    console.log('person saved!')
    mongoose.connection.close()
  })
    .catch(err => {
      console.error('Error in save():', err.message)
      mongoose.connection.close()
    })
}

const list = () => {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person.name + ' ' + person.number)
    })
    mongoose.connection.close()
  })   
    .catch(err => {
      console.error('Error in list():', err.message)
      mongoose.connection.close()
    })
}

const name = process.argv[3]
if(name) {
  const number = process.argv[4]
  save(name, number)
} else {
  list()
}
