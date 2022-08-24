

import { getData ,getUserById,getUserByName,deleteUser,HandleAdd,HandleUpdate} from "../model/main.js";

let users = []

const displayTable = ()=>{
    const tbody = users.map(item=>
        `
            <tr>
                <td>${item.name}</td>
            </tr>
        `
        )
        document.querySelector('tbody').innerHTML = tbody.join('')
}
        
      
getData().then(res=>res.json())
.then(data=>{
    users = [...data]
    displayTable()
})


    
    

document.querySelector('.control-search').addEventListener('keyup',(e)=>{
    getUserByName(e.target.value).then(res=>res.json())
    .then(data=>users = [...data])
    displayTable()
    if(e.target.value == 'huu'){
        HandleUpdate({
            "id": 11,
            "name": "Huu Du nguyen",
            "username": "Bret",
            "email": "Sincere@april.biz",
            "address": {
              "street": "Kulas Light",
              "suite": "Apt. 556",
              "city": "Gwenborough",
              "zipcode": "92998-3874",
              "geo": {
                "lat": "-37.3159",
                "lng": "81.1496"
              }
            },
            "phone": "1-770-736-8031 x56442",
            "website": "hildegard.org",
            "company": {
              "name": "Romaguera-Crona",
              "catchPhrase": "Multi-layered client-server neural-net",
              "bs": "harness real-time e-markets"
            }
          },).then(res=>res.json())
          .then(data=>{
            users = [...data]
            displayTable()
          })
        
    }
})


deleteUser(1).then(res=>res.json())
.then(data=>console.log(data))



