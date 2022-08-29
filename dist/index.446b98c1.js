const Form__Add = ()=>{
    document.querySelector(".form-add").innerHTML = [
        `
   <form action="/Add-handel" method="post" name="form1">
       <label><span>Name</span><input type="text" name="name" require></label>
       <label><span>Email</span><input type="email" name="email" require></label>
       <button type="submit" name="btnSave">Save</button>
       <button type="submit" name="btnReset">Reset</button>
   </form>
    `
    ].join("");
    document.form1.onsubmit = (e)=>{
        e.preventDefault();
        console.log(document.form1.querySelectorAll("input"));
        if (confirm("Your must add user?")) console.log(document.form1.name.value);
        return;
    };
    document.form1.btnReset.onclick = (e)=>{
        e.preventDefault();
        document.form1.querySelectorAll("input").forEach((input)=>input.value = "");
    };
};
Form__Add();

//# sourceMappingURL=index.446b98c1.js.map
