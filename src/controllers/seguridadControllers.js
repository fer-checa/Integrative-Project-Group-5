
const seguridadController = 
{
    login: (req, res) => 
    {
        res.render('login',{titulo:'Mundo Mascota DH-Login'});        
    },
    register: (req, res) => 
    {
        res.render('register',{titulo:'Mundo Mascota DH-Register'});        
    },
    admin: (req, res) => 
    {
        res.render('admin',{titulo:'Mundo Mascota DH-ABM Producto'});        
    }
                
}

module.exports = seguridadController;