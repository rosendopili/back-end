const url = 'http://localhost:3000'
const peopleContainer = document.querySelector('.peopleContainer'); 

let firstNameCreate = document.querySelector('.firstNameCreate'); 
let lastNameCreate = document.querySelector('.lastNameCreate'); 
let firstNameUpdate = document.querySelector('.firstNameUpdate'); 
let lastNameUpdate = document.querySelector('.lastNameUpdate'); 
let idUpdate = document.querySelector('.idUpdate'); 
let idDelete = document.querySelector('.idDelete'); 

const create = document.querySelector('.create'); 
const update = document.querySelector('.update'); 
const del = document.querySelector('.delete'); 
const form = document.querySelectorAll('form'); 


const getPeople = () => {
    peopleContainer.textContent = ""; 
    fetch(`${url}/people`, {
        method: 'GET', 
    })
    .then((res) => res.json())
    .then((res) => res.forEach(el => {
        let row = document.createElement('h1'); 
  
        row.textContent = `${el.first} ${el.last} ${el.id}`

        peopleContainer.prepend(row)
    }))
    .catch((err) => console.log(err))   
} 

const createPeople = (first, last) => {
    console.log(first, last)
    let name = {
        first : first,  
        last: last
    }
  
    fetch(`${url}/people`, {
        method: 'POST', 
        headers: {
            'Content-Type' : 'application/json', 
        }, 
        body: JSON.stringify(name) 
    })
    .catch((err) => console.log(err))

    getPeople(); 
}

const updatePerson = (first, last, id) => {
    let name = {
        first: first, 
        last: last
    }
    
    fetch(`${url}/people/${id}`, {
        method: 'PUT', 
        headers: {
            'Content-Type' : 'application/json', 
        }, 
        body: JSON.stringify(name) 
    })
    .catch((err) => console.log(err))

    getPeople(); 
}

const deletePerson = (id) => {

    fetch(`${url}/people/${id}`, {
        method: 'DELETE', 
        headers: {
            'Content-Type' : 'application/json', 
        }
    })
    .catch((err) => console.log(err))

    getPeople(); 
}

create.addEventListener('click', (e) => {
    e.preventDefault(); 
    createPeople(firstNameCreate.value, lastNameCreate.value);
})

update.addEventListener('click', (e) => {
    e.preventDefault(); 
    updatePerson(firstNameUpdate.value, lastNameUpdate.value, idUpdate.value);
})

del.addEventListener('click', (e) => {
    e.preventDefault(); 
    deletePerson(idDelete.value);
})

getPeople(); 
