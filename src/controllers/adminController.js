const adminController = {

    index : (req, res) =>{
        res.render('admin', {titulo: "Mundo Mascota DH-Administrar"})
    },

    product : (req, res) =>{
        res.render('productABM', {titulo: "Mundo Mascota DH-ABM Producto"})
    },

}

module.exports = adminController;