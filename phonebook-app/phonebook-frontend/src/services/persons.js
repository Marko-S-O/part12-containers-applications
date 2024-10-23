import axios from 'axios'

// this allows to test the development time setupo with the React+Vite running on 5173
const isDevelopment = import.meta.env.MODE === 'development'
// eslint-disable-next-line
console.log(isDevelopment? 'running development mode, connecting port 3000' : 'running production server')
const personURL = import.meta.env.PERSON_URL || 'http://localhost:3000/api/persons'


const getPersonsFromServer = () => {
    //console.log('getPersonsFromServer()')
    const request = axios.get(personURL)
    const p = {id: 9999, name:' non existing', number: '000000'}
    return request.then(response => response.data.concat(p))
}

const savePersonToServer = (newPerson) => {
    const request = axios.post(personURL, newPerson)
    return request.then(response => {
        return response.data
    })
    .catch(error => {
        // eslint-disable-next-line
        console.log(error)
        const errorMessage = error.response.data.error
        // throw again the error with a message from JSON to allow showing it in the notification area
        throw new Error(errorMessage)
    })
}

const deletePersonFromServer = (id) => {
    const url = personURL + '/' + id
    // eslint-disable-next-line
    console.log("deleting from server: " + url)
    const request = axios.delete(url)
    return request.then(response => response.data)
}

const updatePersonToServer = (id, name, number) => {
    const url = personURL + '/' + id
    const p = {id: id, name: name, number: number}
    const request = axios.put(url, p)
    return request.then(response => response.data)
}

export default { getPersonsFromServer, savePersonToServer, deletePersonFromServer, updatePersonToServer }