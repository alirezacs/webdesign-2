let userform =
document.getElementById("userform")

let userslist =
document.getElementById("userslist")

let users =[];


userform.addEventListener("submit",
    function(event){

        event.preventDefault();
        
        let name =
        document.getElementById("name").value;

        let email =
         document.getElementById("email").value;

         let phone =
          document.getElementById("phone").value;

         let user ={
        name: name,
        email: email,
        phone: phone
    };
    users.push(user);
    
    let li =document.createElement("li");
    
    li.innerText =name +"|"+email +"|"+phone;
    
    userslist.appendChild(li)

    userform.reset();
    });


    


    