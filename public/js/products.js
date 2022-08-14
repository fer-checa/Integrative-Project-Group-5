window.addEventListener("load", function () {

    let formulario = document.querySelector(".formProduct");
    console.log(formulario);

    formulario.nombre.focus();


    /* ********************************************************* */
    formulario.addEventListener("submit", function (evento) {

        let errors = [];

        /* VALIDACION NOMBRE DEL PRODUCTO */
        let nameProduct = document.querySelector("#nombre");
       

        if (nameProduct.value == "") {

            errors.push("El campo Nombre del Producto debe que estar completo");
            nameProduct.classList.remove("is-valid");
            nameProduct.classList.add("is-invalid");

        } else if (nameProduct.value.length < 5) {

            errors.push("El campo Nombre del Producto no puede estar vacío");
            nameProduct.classList.remove("is-valid");
            nameProduct.classList.add("is-invalid");

        } else {
            nameProduct.classList.add("is-valid");
            nameProduct.classList.remove("is-invalid");
            formulario.descripcion.focus();
        };

        /* VALIDACION DESCRIPCION DEL PRODUCTO */
        let descriptionProduct = document.querySelector("#descripcion");
        

        if (descriptionProduct.value == "") {

            errors.push("El campo Descripcion del Producto debe que estar completo");
            descriptionProduct.classList.remove("is-valid");
            descriptionProduct.classList.add("is-invalid");

        } else if (descriptionProduct.value.length < 20) {

            errors.push("El campo Descripcion del Producto no puede estar vacío");
            descriptionProduct.classList.remove("is-valid");
            descriptionProduct.classList.add("is-invalid");
            

        } else {

            descriptionProduct.classList.add("is-valid");
            descriptionProduct.classList.remove("is-invalid");
            formulario.categoria.focus();
        };


        /* VALIDACION CATEGORIA DEL PRODUCTO */
        let categoryProduct = document.querySelector("#categoria");
        

        if (categoryProduct.value == "") {

            errors.push("El campo Seleccione Categoria no puede estar vacío");
            categoryProduct.classList.remove("is-valid");
            categoryProduct.classList.add("is-invalid");
        };


        /* VALIDACION FAMILIA DEL PRODUCTO */
        let familyProduct = document.querySelector("#familia");
        

        if (familyProduct.value == "") {

            errors.push("El campo Seleccione Familia no puede estar vacío");
            familyProduct.classList.remove("is-valid");
            familyProduct.classList.add("is-invalid");
            formulario.precio.focus();
        };


        /* VALIDACION PRECIO PRODUCTO */
        let priceProduct = document.querySelector("#precio");
        

        if (priceProduct.value == "") {

            errors.push("El campo Precio debe que estar completo");
            priceProduct.classList.remove("is-valid");
            priceProduct.classList.add("is-invalid");

        } else if (priceProduct.value.length < 1000) {

            errors.push("El campo Precio no puede estar vacío");
            priceProduct.classList.remove("is-valid");
            priceProduct.classList.add("is-invalid");
            

        } else {
            priceProduct.classList.add("is-valid");
            priceProduct.classList.remove("is-invalid");
            formulario.descuento.focus();

        };


        /* VALIDACION PRECIO PRODUCTO */
        let discountProduct = document.querySelector("#descuento");
        

        if (discountProduct.value == "") {

            errors.push("El campo Descuento no puede estar vacío");
            discountProduct.classList.remove("is-valid");
            discountProduct.classList.add("is-invalid");
        }

        /* VALIDACION IMAGEN DEL PRODUCTO */
        /* FALTA LA LOGICA PARA LA IMAGEN */
        /*  let fileProduct = document.querySelector("#foto"); */


        /* VALIDACION PRODUCTO ACTIVO*/
        let activeProduct = document.querySelector("#selActivo");
        

        if (activeProduct.value == "") {

            errors.push("El campo Producto Activo no puede estar vacío");
            activeProduct.classList.remove("is-valid");
            activeProduct.classList.add("is-invalid");

        } else {

            activeProduct.classList.add("is-valid");
            activeProduct.classList.remove("is-invalid");
            formulario.activo.focus();

        };


        if (errors.length > 0) {

            evento.preventDefault();
            let ulErrors = document.querySelector(".errores");
            ulErrors.classList.add("alert-warning");
            ulErrors.innerHTML = "";
            for (let i = 0; i < errors.length; i++) {
                ulErrors.innerHTML += "<li>" + errors[i] + "</li>";
            };
        } else {
            alert("VALIDACION EXITOSAAA")
            formulario.submit();
        }
        /* ************************************************************** */

        
    })

})