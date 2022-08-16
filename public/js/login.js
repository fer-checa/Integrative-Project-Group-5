
window.addEventListener("load", () => {
    
    let form = document.querySelector("form");

    form.addEventListener("submit", (event) => {
        
        let errors = [];
        
        let email = document.querySelector("#email");
        let password = document.querySelector("#password");
        
        let  emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        
        if (email.value == "") {
            errors.push("El campo email no puede estar vacío");
            email.classList.remove("is-valid");
            email.classList.add("is-invalid");
        }else if (!emailRegex.test(email.value)) 
        {
            errors.push("El campo email es incorrecto");
            email.classList.remove("is-valid");
            email.classList.add("is-invalid");
        } 

        else {
            email.classList.add("is-valid");
            email.classList.remove("is-invalid");
        };

        if (password.value == "") {
            errors.push("El campo constraseña no puede estar vacío");
            password.classList.remove("is-valid");
            password.classList.add("is-invalid");
            
        } else if (password.value.length < 4 ) 
        {
            errors.push("La constraseña debe tener como minimo 4 caracteres");
            password.classList.remove("is-valid");
            password.classList.add("is-invalid");
        }  
        else 
        {
            password.classList.add("is-valid");
            password.classList.remove("is-invalid");
        };
        
        if (errors.length > 0) {
            
            event.preventDefault();
            let ulErrors = document.querySelector(".errores");
            ulErrors.classList.add("alert-warning");
            ulErrors.innerHTML = "";
            for (let i = 0; i < errors.length; i++) {
                ulErrors.innerHTML += "<li>" + errors[i] + "</li>";
            };
        } else {
            
            form.submit();
        }
    });
})