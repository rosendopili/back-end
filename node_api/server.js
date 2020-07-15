const {Client} = require('pg')
const express = require ("express")
const app = express(); 

const client = new Client({
    user: "macbook", 
    host: "localhost", 
    port: 5432, 
    database: "todos"
}) 
app.get("/todos", (req, res) => {
    res.send("GET REQUEST SUCCESSFUL"); 
})
app.listen(8080, () => console.log('8080 listening'))

start()

async function start() {
    await connect();
    
    const todos = await readTodos();
    console.log(todos)
    const successCreate = await createTodo("Go to trader joes")
    console.log(`Creating was ${successCreate}`)
    const successDelete = await deleteTodo(1)
    console.log(`Deleting was ${successDelete}`)

}

async function connect() {
    try {
        await client.connect();
    }
    catch(e) { 
        console.error(`Failed to connect ${e}`)
    }
}

async function readTodos() {
    try {
    const results = await client.query("select id, text from todos");
    return results.rows;
    }
    catch(e){
        return [];
    }
}

async function createTodo(todoText){

    try {
        await client.query("insert into todos (text) values ($1)", [todoText]);
        return true
        }
        catch(e){
            return false;
        }
}

async function deleteTodo(id){

    try {
        await client.query("delete from todos where id = $1", [id]);
        return true
        }
        catch(e){
            return false;
        }
}