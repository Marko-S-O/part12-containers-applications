const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const MONGO_URL = process.env.MONGO_URL || 'mongodb://root:example@localhost:3456/the_database?authSource=admin';
const url = MONGO_URL
console.log('connecting to', url)

mongoose.connect(url)
  // eslint-disable-next-line
  .then(result => {
    console.log('connected DB')
  })
  // eslint-disable-next-line  
  .catch((error) => {
    console.log('error connecting DB')
  })

const personSchema = new mongoose.Schema({
  name: {    
    type: String,    
    minlength: 3,    
    required: true
  },  
  number: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        //console.log('validating :' + v)
        return /(?=.{8,})\d{2,3}-\d{5,12}/.test(v)
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    // eslint-disable-next-line    
    required: [true, 'User phone number required']
  } 
})

personSchema.set('toJSON', {
    
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)