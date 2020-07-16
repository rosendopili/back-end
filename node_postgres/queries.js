const { Pool } = require('pg')
const pool = new Pool({
  user: 'macbook',
  host: 'localhost',
  database: 'nodedb',
  port: 5432
})
const getPeople = (request, response) => {
  pool.query('SELECT * FROM employees ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getPeopleById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM employees WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createPeople = (request, response) => {
  const { first, last } = request.body

  pool.query('INSERT INTO employees (first, last) VALUES ($1, $2)', [first, last], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${result.id}`)
  })
}

const updatePeople = (request, response) => {
  const id = parseInt(request.params.id)
  const { first, last } = request.body

  pool.query(
    'UPDATE employees SET name = $1, email = $2 WHERE id = $3',
    [first, last, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deletePeople = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM employees WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getPeople,
  getPeopleById,
  createPeople,
  updatePeople,
  deletePeople,
}