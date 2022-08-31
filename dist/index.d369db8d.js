class JQuery {
    constructor(selector){
        this.selector = selector;
    }
    next() {
        return document.querySelector(this.selector);
    }
    hide() {
        document.querySelector(this.selector).style.display = "none";
    }
    show() {
        document.querySelector(this.selector).style.display = "block";
    }
    css(property, value) {
        document.querySelector(this.selector).style[property] = value;
    }
    innerHTML(html) {
        document.querySelector(this.selector).innerHTML = [
            html
        ].join("");
    }
    addEventListener(event, callback) {
        document.querySelector(this.selector).addEventListener(event, callback);
    }
}
let $ = (selector)=>new JQuery(selector);
const update = (id)=>{
    document.form1.style.display = "block";
    $(".form-title").innerHTML("Update user");
    $(".btn-close").addEventListener("click", (e)=>{
        e.preventDefault();
        document.form1.style.display = "none";
    });
};
const del = (id)=>{
    alert("Delete user");
};

//# sourceMappingURL=index.d369db8d.js.map
