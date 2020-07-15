const {Client} = require('pg')

const client = new Client({
    user: "macbook", 
    host: "localhost", 
    port: 5432, 
    database: "nodedb"
}) 

execute()

async function execute() {
    try{
        await client.connect()
        await client.query("BEGIN")
        await client.query("insert into employees values ($1, $2)", ['john', 'starks'])
        const results = await client.query("select * from employees")
        console.table(results.rows)
        await client.query("COMMIT")
    }catch(e){
        console.log('Something went wrong ' + e)
        await client.query("ROLLBACK")
    }finally{
        await client.end()
        console.log('disconnected'); 
    }
}