
const data = [
    {
        id: 1,
        name:'Jan',
        date:'31-12-2002'
    },{
        id: 2,
        name:'Feb',
        date:'31-12-2003'
    
    },
    {
        id: 3,
        name:'Mar',
        date:'31-12-2004'
    },{
        id: 4,
        name:'Apr',
        date:'31-12-2005'
    }
    
]
console.log(data[-1])

const loadData = function(){
    const body = document.querySelector('.my_table').querySelector('tbody')
    let rows = data.map(({id,name,date})=>
         `
        <tr>
            <td>${id}</td>
            <td>${name}</td>
            <td>${date}</td>
            <td>
                <button class="btn-delete">Delete</button>
                <button class="btn-update">Update</button>
            </td>
        </tr>
        `
    );
    body.innerHTML = rows.join('')
    
}
loadData()
const modal = document.querySelector('.modal')

const showModal = function(title,data1 = null){
    modal.style.display = 'block'
    document.querySelector('.modal__title').innerHTML = title
    if(data1!=null){
        //update
        document.forms[0]['name'].value = data1.name
        document.forms[0]['date'].value = data1.date
        const save = document.querySelector('.btn-add')
        
        save.addEventListener('click',()=>{
            data[id=data1.id].name = document.forms[0]['name'].value
            data[id=data1.id].date = document.forms[0]['date'].value
            loadData()
            closeHandle()
        })
    }
    else{
        //add

        document.forms[0]['name'].value = ''
        document.forms[0]['date'].value = ''
        const add = document.querySelector('.btn-add')
        add.addEventListener('click',()=>{
            data.push({
                id:length,
                name:document.forms[0]['name'].value,
                date:document.forms[0]['date'].value,
            })
            loadData()
            closeHandle()
        })
    }

    
    const close = document.querySelector('.close')
    const closeHandle = ()=>{
        modal.style.display = 'none'
    }
    close.addEventListener('click',()=>{
        closeHandle()
    })
    const cancel = document.querySelector('.btn-cancel')
    cancel.addEventListener('click',()=>{
        closeHandle()
    })
    

}


const btn_add = document.querySelector('.user__add-button')

btn_add.onclick = ()=>{
    showModal('Add user')
}

setTimeout(()=>{
    data[0].date = 1
    loadData()
},6000)









