

const userRouteAdminMW =  (req,res,next) => 
{
        let userLog = 0;
        let idUser = 1;
           

        //verificamos si el usuario esta logueado.

        //si no esta logueado, podemos enviarlo a login 
        //res.render('users/login',{titulo:'Mundo Mascota DH-Login'});

        

        //si esta logueado , ejecutamos next() para seguir con la ejecucion.
        next();
}

module.exports = userRouteAdminMW;