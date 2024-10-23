require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const DEFAULT_PORT = 3000
console.log('starting the app...')

app.use(express.static('build'))
app.use(express.json())
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status  :res[content-length] - :response-time ms :body'))
app.use(cors())
app.use(express.static('dist'))

app.get('/info', (request, response, next) => {

  Person.find({}).then(persons => {
    
    const resp = '<p>Phonebook has info for ' +
    persons.length + ' people</p> <p>' +
    new Date() + '</p>'
    
    response.send(resp)
  })
    .catch(error => next(error))
})

app.get('/api/persons', (request, response, next) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  
  const id = request.params.id

  Person.findById(id).then(person => {
    if(person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  console.log('deleting id: ' + id)
  Person.findByIdAndDelete(id).then(result => {
    if(result) {
      console.log('succesfully deleted ' + id)
      response.status(204).end()
    } else {
      console.log('did not find in db to delete: ' + id)
      response.status(204).end()
    }
  })
    .catch(error => next(error))
})

const nameExists = (name) => {

  Person.find({}).then(persons => {
    let p = persons.find(person => person.name === name)
    return p
  })
}

app.post('/api/persons', (request, response, next) => {

  const body = request.body

  if(!body.number) 
    return response.status(400).json({ 
      error: 'cannot add: phone number missing' 
    })
  
  if(nameExists(body.name)) 
    return response.status(400).json({ 
      error: `name ${body.name} already exists, can't add` 
    })

  const person = new Person({
    name: body.name,
    number: body.number
    //id: generateId()
  })
  person.save().then(savedPerson => {
    console.log('succesfully saved: ' + savedPerson.name)
    response.json(savedPerson)
  })    
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {

  const id = request.params.id
  const newNumber = request.body.number

  console.log('updating id: ' + id + ', new number ' + newNumber)

  Person.findByIdAndUpdate(id, {number: newNumber}, { new: true })
    .then(p => {
      if(p) {
        console.log('number for id ' + id + 'updated')
        response.json(p)
      } else {
        console.log('not updated, person for id ' + id + ' not found in DB')
        response.status(404).send({ 
          error: 'not updated, person for id ' + id + ' not found in DB' 
        })
      }
    })
    .catch(error => next(error))
})

const PORT = process.env.PORT || DEFAULT_PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const errorHandler = (error, request, response, next) => {

  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {    
    console.log('Validation error: ' + error.message)
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)