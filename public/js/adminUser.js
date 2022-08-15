
window.addEventListener("load", () => {
    let form = document.querySelector("form");
    
   
    form.addEventListener("submit", (event) => {
           
        let errors = [];
        
        let name = document.querySelector("#name");
        let email = document.querySelector("#email");
        
        if (name.value == "") {
            errors.push("Js : El campo Nombre no puede estar vacío");
            name.classList.remove("is-valid");
            name.classList.add("is-invalid");
            
        } else if (name.value.length < 2 ) {
            errors.push("Js : El campo nombre debe tener como minimo 2 caracteres");
            name.classList.remove("is-valid");
            name.classList.add("is-invalid");
        } 
        else {
            name.classList.add("is-valid");
            name.classList.remove("is-invalid");
        };

        if (email.value == "") {
            errors.push("Js : El campo email no puede estar vacío");
            email.classList.remove("is-valid");
            email.classList.add("is-invalid");
            //form.email.focus();
        } else {
            email.classList.add("is-valid");
            email.classList.remove("is-invalid");
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