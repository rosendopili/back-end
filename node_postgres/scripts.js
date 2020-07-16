const peopleContainer = document.querySelector('.peopleContainer'); 

fetch(`http://localhost:3000/people`)
.then((res) => res.json())
.then((res) => 
    getPeople(res))
.catch((err) => console.log(err))


const getPeople = (arr) => {
    arr.forEach(el => {
        let name = document.createElement('h1'); 
  
        name.textContent = `${el.first} ${el.last} ${el.id}`

        peopleContainer.prepend(name)
    })
}

