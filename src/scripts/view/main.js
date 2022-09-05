import { FindAllUser, FindUserByName,FindUserById,DeleteById,AddUser,UpdateUser } from '../controller/main.js'

FindAllUser().then(data=>{
    show_table(data)
})




const show_table = (data)=>{
    console.log(data);
    const tbody = data.map((value,index)=>
    `<tr key=${value.id}>
        <td>${index}</td>
        <td>${value.name}</td>
        <td>${value.address}</td>
        <td>
            <button class="btn btn-warning">Update</button>
            <button class="btn btn-danger">Delete</button>
        </td>
    </tr>`)
    document.querySelector('.table-body').innerHTML= tbody.join('')
    document.querySelectorAll('tr').forEach((item,index)=>{
        if (index > 0) {
            
            item.querySelectorAll('td')[3].querySelectorAll('button')[0].addEventListener('click',() => {
                document.form1.style.display = 'block'
                document.querySelector('.form-title').innerHTML= 'Update user'

                document.form1.btnSave.addEventListener('click', async(e) => {
                    e.preventDefault()
                    await UpdateUser(
                        {
                            id:item.getAttribute('key'),
                            name:document.form1.name.value,
                            username:document.form1.username.value,
                            email:document.form1.email.value,
                            phone:document.form1.phone.value,
                            website:document.form1.website.value,
                            address:document.form1.address.value,
                            }
                    ).then(data=>{
                        FindAllUser().then(data=>show_table(data))
            
                    })
                    document.form1.btnReset.click()
                    document.form1.style.display = 'none'
                    
                })
                

                document.querySelector('.btn-close').addEventListener('click',(e)=>{
                    e.preventDefault()
                    document.form1.btnReset.click()
                    document.form1.style.display = 'none'
                })
                FindUserById(item.getAttribute('key')).then(data=>{
                    document.form1.name.value = data.name
                    document.form1.username.value = data.username
                    document.form1.email.value = data.email
                    document.form1.phone.value = data.phone
                    document.form1.website.value = data.website
                    document.form1.address.value = data.address
                   

                })
            })
            item.querySelectorAll('td')[3].querySelectorAll('button')[1].addEventListener('click',() => {

                if(confirm('Your want to remove user'))

                {
                    DeleteById(item.getAttribute('key')).then( async data => {
                        await FindAllUser().then(data=>{
                            show_table(data)
                            document.querySelector('.message').style.display = 'block'
                            setTimeout(()=>{
                                document.querySelector('.message').style.display = 'none'
                            },1000)
                        })
                    })
                }
                
                
            })
        }
        
        
    })
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

    document.form1.btnSave.addEventListener('click', async(e) => {
        e.preventDefault()
        await AddUser(
            {
                name:document.form1.name.value,
                username:document.form1.username.value,
                email:document.form1.email.value,
                phone:document.form1.phone.value,
                website:document.form1.website.value,
                address:document.form1.address.value,
                }
        ).then(data=>{
            FindUserByName(e.target.value).then(data=>show_table(data))

        })
        document.form1.btnReset.click()
        document.form1.style.display = 'none'
        
    })

    document.querySelector('.btn-close').addEventListener('click',(e)=>{
     e.preventDefault()
     document.form1.style.display = 'none'
    })
 })






