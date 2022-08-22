//MVC

//Models



const getData = ()=>(
    [
        {
            name:'Jan',
            age:30,
            gender: 'male',
            birthday: new Date(Date.now()-1000*60*60*1000),
        },
        {
            name:'Petter',
            age:30,
            gender: 'male',
            birthday: new Date(Date.now()-1000*60*60*1000),
        }
        ,{
            name:'Linda',
            age:30,
            gender: 'male',
            birthday: new Date(Date.now()-1000*60*60*1000),
        }
    ]
)

const getEmployeesByName = (type)=>{
    const data = getData()
    let i = data.filter(item=>{
        return item.name.toLowerCase().includes(type.toLowerCase())
    })
    return i
}



//Views

const display = (data)=>{
    const demo = data.map(({name,age,gender,birthday})=>{
        return `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${name}</h5>
                    <p class="card-text">${age}</p>
                    <p class="card-text">${gender}</p>
                    <p class="card-text">${birthday}</p>
                </div>
            </div>
        `

    })
    document.querySelector('#demo').innerHTML = demo.join('')

}
//Controllers


display(getData())
console.log(getEmployeesByName('an')[0]);