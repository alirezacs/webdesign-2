let users = [];

let form=
document.getElementById("userForm");
let fName = 
document.getElementById("fName");
let email = 
document.getElementById("email");
let phone = 
document.getElementById("phone");
let usersList = 
document.getElementById("usersList");

form.addEventListener("submit", function(event) {
    event.preventDefault();
    let name = fName.value;
    let emailValue = email.value;
    let phoneValue = phone.value;

   let newUser = {
    name: name,
    email: emailValue,
    phone: phoneValue
};
    users.push(newUser);
    let li = document.createElement("li");

    li.innerHTML = newUser.name + " - " + newUser.email + " - " + newUser.phone;

    usersList.appendChild(li);
    form.reset();
});




