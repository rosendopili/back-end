const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./queries')
const port = 3000
const app = express()

app.use(cors()) 
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/people', db.getPeople)
app.get('/people/:id', db.getPeopleById)
app.post('/people', db.createPeople)
app.put('/people/:id', db.updatePeople)
app.delete('/people/:id', db.deletePeople)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })

app.listen(port, () => {
console.log(`App running on port ${port}.`)
})