const adminController = {

    index : (req, res) =>{
        
        res.render('admin', {titulo: "Mundo Mascota DH-Administrar"})
    },
 
}

module.exports = adminController;