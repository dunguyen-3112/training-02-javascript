/*
    Display list user
*/ const getData = async ()=>{
    await fetch("http://localhost:3000/users").then((response)=>response.json()).then((data)=>{
        console.log(data);
        if (data.length == 0) return;
        return data;
    // const tbody = data.map(item=>
    //     `
    //         <tr>
    //             <td>${item.name}</td>
    //         </tr>
    //     `
    //     )
    // document.querySelector('tbody').innerHTML = tbody.join('')
    }).catch((err)=>{
        console.log(err);
        return;
    });
};

//# sourceMappingURL=index.9fdb7f00.js.map
