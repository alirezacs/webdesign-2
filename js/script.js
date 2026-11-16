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
let btn = document.getElementById('btn');

btn.addEventListener('click', e => {
    console.log(window.location.protocol);
    
})
