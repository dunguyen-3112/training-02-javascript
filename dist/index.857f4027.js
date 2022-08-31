const update = (id)=>{
    document.form1.style.display = "block";
    console.log(document.form1.name);
    document.querySelector(".form-title").innerHTML = "Update user";
    document.querySelector(".btn-close").addEventListener("click", (e)=>{
        e.preventDefault();
        document.form1.style.display = "none";
    });
};
const del = (id)=>{
    alert("Delete user");
};

//# sourceMappingURL=index.857f4027.js.map
