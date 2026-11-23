let users =[];

let form = 
document.getElementById("userform");
let fname = 
document.getElementById("fname");
let email = 
document.getElementById("email");
let phone = 
document.getElementById("phone");
let userslist = 
document.getElementById("userslist");

form.addEventListener("submit", function(event) {
    event.preventDefault();
    let name = fname
    let emailvalue = email.value;
    let phonevalue = phone.value;

    let newuser = {
        name: name,
        email: email.value,
        phone: phonevalue
    };
    users.push(newuser);
    let li = document.createElement("li");

    li.innerHTML = newuser.name + "" + newuser.email + "" +newuser.phone;
    userslist.appendChild(li);
    form.reset();

});
