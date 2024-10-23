{/* 2.10: this solution does not feel very elegant - should the state be outside the components some way */}

import { useState, useEffect } from 'react'

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personsService from './services/persons'

const Notification = ({ message, error }) => {

  const cname = error ? "error" : "notification"

  return (
    <div className={cname}>
      {message}
    </div>
  )
}

const App = () => {

  const [persons, setPersons] = useState([])

  const [filteredPersons, setFilteredPersons] = useState(persons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchString, setSearchString] = useState('')
  const [notification, setNotification] = useState('')
  const [error, setError] = useState(false)


  useEffect(() => {
    personsService.getPersonsFromServer()
      .then(persons => {
        //console.log("retrieved persons from server")
        setPersons(persons)
        setFilteredPersons(persons)
      })
  }, [])

  const setNotificationMessage = (message, error) => {
    setError(error)
    setNotification(message)
    setTimeout(() => {          
      setNotification('')
      setError(false)
    }, 2500)    
      
  }

  // Should refactor a bit not to replicate code. However, this might be that useful for the actual goal of the exercise
  const updatePerson = () => {
    //console.log('updatePerson()')
    if(confirm(`${newName} is already added to phonebook, replace old number with a new one?`)) {
      const newList = [...persons]
      let index = persons.findIndex(person => person.name === newName)
      newList[index].number = newNumber
      setPersons(newList)
      const fList = filter(newList, searchString)
      setFilteredPersons(fList)
      setNewName('')  
      setNewNumber('')  

      let id = newList[index].id
      personsService.updatePersonToServer(id, newName, newNumber)   

      setNotificationMessage(`updated number for ${newName} succesfully`, false)
      
    }
  }

  const addPerson = (event) => {
    //console.log('addPerson()')
    event.preventDefault()

    const numbers = persons.map(person => person.number)

    if(numbers.includes(newNumber)) {
      setNotificationMessage(`Number ${newNumber} is already added to phonebook`, true)
    } else {

      const names = persons.map(person => person.name)
      if(names.includes(newName)) {
        updatePerson()
      } else {
        // need to change the order of acations to get the ID of the new person from DB for further use
        let newPerson = {name: newName, number: newNumber}
        personsService.savePersonToServer(newPerson).then(person => {
          newPerson = person
          //console.log(newPerson)
          const newList = persons.concat(newPerson)
          setPersons(newList)
          const fList = filter(newList, searchString)
          setFilteredPersons(fList)
          setNotificationMessage(`Added ${newName} succesfully`, false)
          setNewName('')  
          setNewNumber('')  
        })
        .catch(error => {
          setNotificationMessage(error.message, true)
        })

      }
    }
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const filter = (fullList, s) => {
    const newList = fullList.filter(person => person.name.toLowerCase().indexOf(s.toLowerCase())>-1)

    return newList
  }

  const handleSearch = (event) => {

    setSearchString(event.target.value)

    let s = event.target.value
    if(s && s.length>0) {
      const f = filter(persons, s)
      setFilteredPersons(f)
    } else {
      {/* for the case of emptying the search field after searcing */}
      setFilteredPersons(persons)
    }  
  }

  const deletePerson = (event, id, name) => {

    if(confirm(`Delete ${name}?`)) {

      event.preventDefault()
      // eslint-disable-next-line
      console.log('deletePerson(' + id + ')')

      personsService.deletePersonFromServer(id)
        // eslint-disable-next-line
        .catch(error => {
          // eslint-disable-next-line
          console.log('delete error!')
          setNotificationMessage(`Information of ${name} has already been removed from server`, true)
        })

      setNotificationMessage(`${name} deleted succesfully`, false)
      
      const newList = persons.filter(person => person.id !== id)
      setPersons(newList)
    
      const fList = filter(newList, searchString)
      setFilteredPersons(fList)
    }
       
  }

  return (
    <div>
      <h2>Phonebook v. 2.0</h2>
      <Notification message={notification} error={error} />
      <Filter searchString={searchString} handleSearch={handleSearch} filter={filter} />
      <PersonForm handlePersonChange={handlePersonChange} handleNumberChange={handleNumberChange} addPerson={addPerson} 
        newName={newName} newNumber={newNumber} />
      <Persons filteredPersons={filteredPersons} deletePerson={deletePerson} />
    </div>
  )

}

export default App