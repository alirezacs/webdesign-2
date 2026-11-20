/* Function */
// let form = document.getElementById('form');

// function checkUsernameAndPassword(username, password){
//     if(username === "Alireza" && password === "12345"){
//         return true;
//     }else{
//         return false;
//     }
// }

// function showLoginStatus(loginStatus){
//     if(loginStatus === true){
//         console.log("You Logged In");
//         document.write("You Logged In");
//     }else{
//         console.log("Username or Password is Invalid");
//         document.write("Username or Password is Invalid");
//     }
// }

// form.addEventListener('submit', function(e){

//     e.preventDefault(); 

//     let username = document.getElementById('username').value;
//     let password = document.getElementById('password').value;

//     let authCheck = checkUsernameAndPassword(username, password);


//     showLoginStatus(authCheck);

// })

/* Loops */
// for(let i = 0; i < 100; i++){
//     console.log(i);
    
//     for(let j = 0; j < 100; j++){
//         console.log(j);
//     }
// }
// let i = 0;


// do{
//     console.log("Hello");
//     i++;
// }while(i < 100)

/* Array In JS */
// let users = ["Alireza", "Nozhan", "Sarina", "Reyhaneh"];
// let usres2 = ["Jafar", "Mamad", "Asghar", "Ahmad"]
// users.push("New User");
// delete users[0];
// users.toString()
// users.concat(usres2)
// Array.isArray(users)
// users.join("-")
// users.slice(1, 4)

// console.log(Array.isArray(users));

/* DOM in JS */
// document.getElementById("h1").style.color = "blue";
// document.getElementById("link").href = "https://google.com"

// document.getElementById("box").innerHTML = "This is a Test Text";

/* Variable Scope */
// let number = 10;
// function sum(){
//     console.log(number);
// }

// sum();

/* DOM */
/* Set or Remove Attribute */
// let box = document.getElementById('box');
// let image = document.getElementById('image');
// box.setAttribute("style", "background-color: blue;")
// image.setAttribute('src', './images/black-cls.jfif')

/* ClassList */
// console.log(box.classList);
// btn.addEventListener('click', e => {
//     if(image.classList.contains("hide")){
//         image.classList.add('active');
//         image.classList.remove('hide');
//     }else{
//         image.classList.add('hide');
//         image.classList.remove('active');
//     }
// })

/* Event Listener in JS */
// let box = document.getElementById('box');
// window.addEventListener('keydown', e => {
//     console.log(e);
// })


// let list = document.getElementById('list');
// let users = ["Alireza", "Nozhan", "Sarina", "Reyhaneh"];

// users.map(user => {
//     list.innerHTML += (li)
// })


// btn.addEventListener('click', e => {
//     console.log(window.location.protocol);
    
// })

/* setTimeout and setInterval */
// let btn = document.getElementById('btn');
// let reset = document.getElementById('reset');
// let timer = document.getElementById('timer');
// let timeOut = setTimeout(() => {
//     console.log("Hello");
// }, 2000);

// clearTimeout(timeOut)
// let miliSecond = 0;
// let seconds = 0;
// let minutes = 0;
// let interval = setInterval(() => {
//     miliSecond++;
//     if(miliSecond === 100){
//         miliSecond = 0;
//         seconds++;
//         if(seconds === 60){
//             seconds = 0;
//             minutes++;
//         }
//     }
//     timer.innerText = `${minutes} : ${seconds} : ${miliSecond}`;
// }, 10)

// btn.addEventListener('click', e => {
//     clearInterval(interval);
// })
// reset.addEventListener('click', e => {
//     clearInterval(interval);
//     miliSecond = 0;
//     seconds = 0;
//     minutes = 0;
//     timer.innerText = `${minutes} : ${seconds} : ${miliSecond}`;
// })

// let sum = (n1, n2, callback) => {
//     let result = n1 + n2;
//     callback(result, poster);
// }

// let printer = (value, poster) => {
//     console.log(value);
//     document.write(value);
//     poster()
// }

// sum(1, 1, printer);

// setInterval(() => {}, 2000)

// let getUsers = new Promise((resolve, rejected) => {
//     resolve("Ba movafaghiat daryaft shod")
//     rejected("khata");
// })

// let getProduct = productId => {

// };

// let registerOrder = (userId, getUser) => {
//     // Check Login Status

//     getUser(userId, getProduct);
// }

/* Promise */
// let getUser = new Promise((resolve, rejected) => {
//     // Send Request to Server for Get User Detail
//     let statusCode = 404;
//     if(statusCode === 200){
//         resolve({ fName: "Alireza", phone: "09121111111", email: "alireza@gmail.com" });
//     }else{
//         rejected("Error in Connection");
//     }
// });

// let getOrders = new Promise((resolve, rejected) => {

// })

// let openPayment = new Promise(res);

// getUser.then((data) => {
//     console.log("User Info Recived : ", data);

//     getOrders.then(() => {
//         openPayment.then
//     })
// }).catch(error => {
//     console.log(error);
// })

/* Async And Await */
// let getUser = async (id) => {
//     let response = await fetch();

//     console.log(response.email);
// }

/* Fetch */
// let getUsers = async () => {
//     let result = await fetch("https://jsonplaceholder.typicode.com/posts", {
//         method: "POST",
//         body: JSON.stringify({
//             title: 'foo',
//             body: 'bar',
//             userId: 1,
//         }),
//         headers: {
//             'Content-type': 'application/json; charset=UTF-8',
//         },
//     }); 
// }

// getUsers();

/* Localstorage */
// let user = {
//     firstName: "Alireza",
//     email: "alireza@gmail.com"
// }
// let converted = JSON.stringify(user);

// localStorage.setItem("user", converted)
let user = localStorage.getItem('user')
console.log(JSON.parse(user));
