const { Client } = require('pg') 

const connection = new Client({
    user: "macbook", 
    host: "localhost", 
    port: 5432, 
    database: "hw"
}) 

connection.connect()
.then(() => console.log('connected!'))
.then(() => connection.query("COPY jobs(ssn,company,salary,experience) FROM '/Users/macbook/Desktop/PSQL_PRACTICE/joins/starter-code/jobs.csv' DELIMITER ',' CSV HEADER"))
.then(() => connection.query("select * from jobs"))
.then(results => console.table(results.rows))
.catch(error => console.log("error occurred " + error))
.finally(() => connection.end())
