const footerController = {

    staff : (req, res) =>{
        res.render('staff', {titulo: "Mundo Mascota DH-Staff"})
    },

    empresa : (req, res) =>{
        res.render('empresa', {titulo: "Mundo Mascota DH-Empresa"})
    },

        
    medioDePago : (req, res) =>{
        res.render('medioDePago', {titulo: "Mundo Mascota DH-Medios de Pago"})
    },

    
    costoDeEnvio : (req, res) =>{
        res.render('costoDeEnvio', {titulo: "Mundo Mascota DH-Costo de Envio"})
    },

    preguntas : (req, res) =>{
        res.render('preguntas', {titulo: "Mundo Mascota DH-Preguntas Frecuentes"})
    },

    terminos : (req, res) =>{
        res.render('terminos', {titulo: "Mundo Mascota DH-Terminos y Condiciones"})
    },
    
}

module.exports = footerController;