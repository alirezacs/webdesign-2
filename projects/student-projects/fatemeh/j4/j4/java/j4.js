let users =[]
let form =document.getElementById("form")
form.addEventListener("submit",
    function(s){
        s.preventDefault();

        let pname =document.getElementById('pname').value
        let phone =document.getElementById('phon').value
        let email =document.getElementById('email').value

        let user ={
            name:pname,
            phone:phone,
            email:email,
        }
        users.push(user)

        document.getElementById('list').innerHTML =
        users.map((user)=>{
          return `<li>
                  ${user.name}
                  ${user.phone}
                  ${user.email}
             
            </li>

            `
        }

        )
    }
)

