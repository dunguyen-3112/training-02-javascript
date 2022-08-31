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
            <button class="btn btn-warning" onclick=update(${value.id})>Update</button>
            <button class="btn btn-danger" onclick=del(${value.id})>Delete</button>
        </td>
    </tr>`)
    document.querySelector('.table-body').innerHTML= tbody.join('')
}


document.querySelector('.control-search').addEventListener('keyup',(e)=>{
    if(e.target.value == '')
    {
        FindAllUser().then(data=>show_table(data))
    }
    else{
        FindUserByName(e.target.value).then(data=>show_table(data))
    }

})

document.querySelector('.btn-add').addEventListener('click',()=>{
    document.form1.style.display = 'block'
    document.querySelector('.form-title').innerHTML='Add new User'

    document.querySelector('.btn-close').addEventListener('click',(e)=>{
     e.preventDefault()
     document.form1.style.display = 'none'
    })
 })

 document.form1.btnSave.addEventListener('click', (events) => { 
    events.preventDefault()
    const geo = {lat:'',lng:''}
     navigator.geolocation.getCurrentPosition(position=>{
        geo.lat = position.coords.latitude
    })
    console.log(geo)
    const user = {
        name:document.form1.name.value,
        username:document.form1.username.value,
        email:document.form1.email.value,
        phone:document.form1.phone.value,
        website:document.form1.website.value,
        company:{
            name:document.form1.cname.value,
            catchPhrase:document.form1.catchPhrase.value,
            bs:document.form1.bs.value,
        },
        address:{
            street:document.form1.street.value,
            suite:document.form1.suite.value,
            zipcode:document.form1.zipcode.value,
            city:document.form1.city.value,
            geo:{
                lat:'',
                lng:''
            }
        }
    }
    console.log(user);
    document.form1.btnReset.click()
    document.form1.style.display = 'none'
})




