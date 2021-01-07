// fetch("http://localhost:3002/users/pug")
// .then(res => res.text())
// .then(body => console.log(body))

let backendURL = "http://localhost:3002/users"

//GETTING DOM VARIABLES
let loginForm = document.getElementById("loginForm")
let registerForm = document.getElementById("registerForm")
let errorhandlingRegister = document.getElementById("errorhandlingRegister")
let errorhandlingLogin = document.getElementById("errorhandlingLogin")

//FUNCTION DECLARATIONS

//ERROR HANDLING FUNCTION FOR DOM
displayError = (id,message) => {
    console.log(message)
    id.innerHTML = `<p>Please correct the following errors</p> <i class="fas fa-exclamation-circle"></i>  `;
    id.append(message);
    // id.app = message;
    id.style.visibility = "initial";

}

//LOGIN HANDLING FUNCTION
async function SubmitLogin(data){
    let sendLogin = await fetch(backendURL + "/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    })

    if (sendLogin.status === 200){
        console.log("Login success")
    } else {

        let sendLoginResBody = await sendLogin.json()
        displayError(errorhandlingLogin,sendLoginResBody.message);
    }

}

//REGISTER HANDLING FUNCTION

async function SubmitRegister(data){
    let sendRegister = await fetch(backendURL + "/registeruser", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    })

    let sendRegisterStatus = sendRegister.status
    if (sendRegisterStatus === 200){
        console.log("User added")
    } else {

        let sendLoginRes = await sendRegister.json();
        displayError(errorhandlingRegister,sendLoginRes.message);
         
    }
}





//LOGIN FORM SUBMISSION LOGIC

loginForm.addEventListener("submit" ,(e)=> {
    e.preventDefault();
    loginEmail = document.getElementById("loginEmail").value;
    loginPassword = document.getElementById("loginPassword").value;
    let data = {
        email: loginEmail,
        password: loginPassword
    }

    console.log(data);
    
    //CALL THE SUBMIT LOGIN FORM FUNCTION

    SubmitLogin(data);
})

//REGISTRATION LOGIC

registerForm.addEventListener("submit" ,(e)=> {
    e.preventDefault();
    inputName = document.getElementById("inputName").value;
    inputEmail = document.getElementById("inputEmail").value;
    inputPassword = document.getElementById("inputPassword").value;
    inputPasswordConfirm = document.getElementById("inputPasswordConfirm").value;

    // console.log(inputName, )

    if( inputPassword !== inputPasswordConfirm){
        displayError(errorhandlingRegister,"Passwords dont Match");
    } else {

        let data = {
            name: inputName,
            email: inputEmail,
            password: inputPassword
        }

        SubmitRegister(data);
    }

    
    //CALL THE REGISTER-FORM FUNCTION

})


