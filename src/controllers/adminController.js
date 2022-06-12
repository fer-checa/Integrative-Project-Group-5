const adminController = {

    product : (req, res) =>{
        res.render('admin', {titulo: "Mundo Mascota DH-Staff"})
    },

}

module.exports = adminController;