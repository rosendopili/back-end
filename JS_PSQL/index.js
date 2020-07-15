const { Client } = require('pg')
const client = new Client({
    user: "macbook", 
    host: "localhost", 
    port: 5432, 
    database: "nodedb"
}) 

client.connect()
.then(() => console.log('connected!'))
.then(() => client.query("select * from employees"))
.then(results => console.table(results.rows))
.catch(e => console.log(e))
.finally(() => client.end())
