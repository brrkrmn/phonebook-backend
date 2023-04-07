const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

//node mongo.js password name number
const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

//noteApp is the name of the database, automatically created
const url =
  `mongodb+srv://brrkrmn:${password}@cluster1.mhsbvqu.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

//create a schema for each entry
const entrySchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', entrySchema)

//create a new entry
const person = new Person({
    name: name,
    number: number
})

//save
if (!name || !number) {
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person.name, ':', person.number)
        })
        mongoose.connection.close();
    })
} else {
    person.save().then(result => {
        console.log(`${name} with the number ${number} saved to the phonebook!`)
        mongoose.connection.close()
      })
}