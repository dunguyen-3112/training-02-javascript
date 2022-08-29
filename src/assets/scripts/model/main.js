const HandleData =  (url,option)=>{
    if(option) return  fetch(url,option).then(res=>res)
    return  fetch(url).then(res=>res)
}
const HandleFindAll = async ()=>{
    return await HandleData('http://localhost:3000/users')
}

const HandleFindById = async (id)=>{
    return await HandleData(`http://localhost:3000/users/${id}`)
}

const HandleFindByName = async (name)=>{
    return await HandleData(`http://localhost:3000/users?name_like=${name}`)

}

const HandleDelete = async (id)=>{
    return await HandleData(`http://localhost:3000/users/${id}`,{method:"DELETE",headers:{"Content-Type":'application/json'}})

}

const HandleAdd = async (user)=>{
    return await HandleData(`http://localhost:3000/users`,{method:"POST",headers:{"Content-Type":'application/json'},body:JSON.stringify(user)})

}

const HandleUpdate = async (user)=>{
    return await HandleData(`http://localhost:3000/users/${user.id}`,{method:"PUT",headers:{"Content-Type":'application/json'},body:JSON.stringify(user)})
    }



export {HandleFindAll,HandleFindById,HandleFindByName,HandleDelete,HandleAdd,HandleUpdate}
