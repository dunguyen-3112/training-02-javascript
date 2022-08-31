const update = (id) => {
    document.form1.style.display = 'block'
    $('.form-title').innerHTML('Update user')

    $('.btn-close').addEventListener('click',(e)=>{
     e.preventDefault()
     document.form1.style.display = 'none'
    })
}

const del = (id) => {
    alert('Delete user')
}

