let users = [];

let form = document.getElementById("userForm");
let usersList = document.getElementById("usersList");
let count = document.getElementById("count");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    let user = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value
    };

    users.push(user);

    usersList.innerHTML = "";

    for (let i = 0; i < users.length; i++) {
        let li = document.createElement("li");

        li.textContent =
            users[i].name + " | " +
            users[i].email + " | " +
            users[i].phone;

        usersList.appendChild(li);
    }

    count.textContent = users.length;

    form.reset();
});