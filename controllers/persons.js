const personsRouter = require('express').Router()
const Person = require('../models/person')

personsRouter.get('/', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

personsRouter.get('/info', (request, response) => {
    Person.countDocuments({})
        .then(result => {
            response.send(`Phonebook has information for ${result} people. <br> ${new Date()}`)
        })
  })

personsRouter.get('/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

personsRouter.delete('/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

personsRouter.post('/persons', (request, response, next) => {
    const body = request.body;
    logger.info(body.name, body.number)
    if (!body.name || !body.number) {
      response.status(400).json({error: 'Provide name and phone.'});
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })
    
    person.save()
        .then(savedPerson => {
            response.json(savedPerson)
        })
        .catch(error => next(error))
})

personsRouter.put('/:id', (request, response, next) => {
    const body = request.body
    const person = {
        name: body.name,
        number: body.number,
    }
  
    Person.findByIdAndUpdate(request.params.id, person, {runValidators: true, context: 'query' })
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
})

module.exports = personsRouter