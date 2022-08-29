class JQuery{
    constructor(selector) {
        this.selector = selector;
    }
    next(){
        return document.querySelector(this.selector)
    }

    hide(){
        document.querySelector(this.selector).style.display = 'none'
    }
    show(){
        document.querySelector(this.selector).style.display = 'block'
    }
    css(property,value){
        document.querySelector(this.selector).style[property] = value
    }
    innerHTML(html){
        document.querySelector(this.selector).innerHTML = [html].join('')
    }
    addEventListener(event,callback){
        document.querySelector(this.selector).addEventListener(event,callback)
    }
}

<<<<<<< HEAD
Form__Add()
=======
let $ = (selector) => new JQuery(selector)

import { FindAllUser, FindUserByName } from '../controller/main.js'

FindAllUser().then(data=>{
    show_table(data)
})




const show_table = (data)=>{
    console.log(data);
    const tbody = data.map((value,index)=>
    `<tr>
        <td>${index}</td>
        <td>${value.name}</td>
        <td>${value.address.city}</td>
        <td>${value.company.name}</td>
        <td>
            <button class="btn btn-warning" onclick=alert(${value.id})>Update</button>
            <button class="btn btn-danger">Delete</button>
        </td>
    </tr>`)

    $('.table-body').innerHTML(tbody.join(''))
}

$('.control-search').next().addEventListener('keyup',(e)=>{
    if(e.target.value == '')
    {
        FindAllUser().then(data=>show_table(data))
    }
    else{
        FindUserByName(e.target.value).then(data=>show_table(data))
    }

})

$('.btn-add').addEventListener('click',()=>{
    document.form1.style.display = 'block'
    $('.form-title').innerHTML('Add new User')

    $('.btn-close').addEventListener('click',(e)=>{
     e.preventDefault()
     document.form1.style.display = 'none'
    })
 })



>>>>>>> 9a1ff5a309ff8c7e591a4424ad574319aa28a038

