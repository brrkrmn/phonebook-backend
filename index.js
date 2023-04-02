const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(morgan(':method :url :status :data'));
app.use(cors()) 
app.use(express.static('build'))

morgan.token('data', (req) => {
    return(JSON.stringify(req.body));
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    response.send(`Phonebook has info for ${persons.length} people. <br> ${new Date()}`)
    
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find(person => person.id === id );
    person 
        ? response.send(person)
        : response.status(404).end();
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    persons =  persons.filter(person => person.id !== id );
    response.status(204).end();
})

app.post('/api/persons', (request, response) => {
    const person = request.body;
    if (!person.name || !person.number) {
        response.status(404).json({error: 'Provide name and phone.'});
    } else if (persons.find(p => p.name === person.name)){
        response.status(404).json({error: 'Person already exists.'});
    } else {
        persons.push(person)
        response.status(201).end();
    }
})

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})