/*
    Display list user
*/
const getData = async ()=>{
    return await fetch("http://localhost:3000/users").then(res=>res)
}

const getUserById = async (id)=>{
    return await fetch(`http://localhost:3000/users/${id}`).then(res=>res)
}

const getUserByName = async (name)=>{
    return await fetch(`http://localhost:3000/users?name_like=${name}`).then(res=>res)
}

const deleteUser = async (id)=>{
    return await fetch(`http://localhost:3000/users/${id}`,{method:"DELETE",headers:{"Content-Type":'application/json'}}).then(res=>res)

}

const HandleAdd = async (user)=>{
    return await fetch(`http://localhost:3000/users`,{method:"POST",headers:{"Content-Type":'application/json'},body:JSON.stringify(user)}).then(res=>res)

}

const HandleUpdate = async (user)=>{
    return await fetch(`http://localhost:3000/users/${user.id}`,{method:"PUT",headers:{"Content-Type":'application/json'},body:JSON.stringify(user)}).then(res=>res).then(res=>res)
    }



export {getData,getUserById,getUserByName,deleteUser,HandleAdd,HandleUpdate}
