//defines schema
const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    minLength: [8, "Number must be at least 8 characters."],
    validate: {
        validator: v => typeof(v) === Number,
        message: props => `${props.value} is not a valid number.`
    },
    validate: {
        validator: v => v.split('-')[0].length === 2 || v.split('-')[0].length === 3,
        message: 'Number should be: 000-00000 or: 00-000000'
    }
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
