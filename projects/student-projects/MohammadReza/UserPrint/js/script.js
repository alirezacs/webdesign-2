const userForm = document.getElementById("userForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");

const usersList = document.getElementById("usersList");

userForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = nameInput.value;
    const email = emailInput.value;
    const phone = phoneInput.value;

    const li = document.createElement("li");

    li.innerHTML = `
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Phone: ${phone}</p>
    `;
    usersList.appendChild(li);

    userForm.reset();

    if (name.trim() === "" || email.trim() === "" || phone.trim() === "") {
        alert("Please fill in all fields!");
        return;
    }

});