let users = [
    {
        fullName: "Alireza",
        email: "alireza@gmail.com",
        phone: "09121111111"
    },
    {
        fullName: "Nozhan",
        email: "nozhan@gmail.com",
        phone: "09121111112"
    },
    {
        fullName: "Sarina",
        email: "sarina@gmail.com",
        phone: "09121111113"
    },
    {
        fullName: "Reyhaneh",
        email: "reyhaneh@gmail.com",
        phone: "09121111114"
    }
];

users.map(user => {
    document.getElementById("list").innerHTML += `
        <tr>
            <td>${user.fullName}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
        </tr>
    `
})