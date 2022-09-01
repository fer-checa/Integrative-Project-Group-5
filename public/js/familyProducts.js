
window.addEventListener("load", () => {

    let form = document.querySelector(".form");
    console.log(form);
    

    form.addEventListener("submit", (event) => {
        
        let errors = [];

        let name = document.querySelector("#nombre");
        console.log(name);
        let activo = document.querySelector("#selectActivo");
        console.log(activo);
        
        
        if (name.value == "") {
            errors.push("El campo Nombre de Familia no puede estar vacío");
            name.classList.remove("is-valid");
            name.classList.add("is-invalid");
        } else {
            name.classList.add("is-valid");
            name.classList.remove("is-invalid");
            form.activo.focus();
        };

       
        
        if (activo.value == "") {
            errors.push("El campo Familia Activa no puede estar vacío");
            activo.classList.remove("is-valid");
            activo.classList.add("is-invalid");
        }  else {
            activo.classList.add("is-valid");
            activo.classList.remove("is-invalid");
            
        };

       

        
        console.log(errors)
        if (errors.length > 0) {
            
            event.preventDefault();
            let ulErrors = document.querySelector(".errores");
            ulErrors.classList.add("alert-warning");
            ulErrors.innerHTML = "";
            for (let i = 0; i < errors.length; i++) {
                ulErrors.innerHTML += "<li>" + errors[i] + "</li>";
            };
        } else {
            //alert("La validación fue exitosa")
            form.submit();
        }
    });
})