const { Client } = require('pg')
 
const client = new Client({
    user: "macbook", 
    host: "localhost", 
    port: 5432, 
    database: "nodedb"
}) 

execute()

async function execute(){
    try{
        await client.connect()
        console.log("Connected Successfully")

        // await client.query("insert into employees values ($1, $2)", ['john', 'starks'])

        const results = await client.query("select * from employees"); 

        console.table(results.rows);   

    } catch (e) {
        console.log('Error occurred ' + e)

    } finally {
        await client.end()
        console.log("Disconnected Successfully")
    }
}