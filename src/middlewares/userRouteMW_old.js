const userRouteMW =  (req,res,next) => 
{
      //por session.  tiene que ser admin el usuario.
      req.session.userId = 0;
      if (req.session.userId == undefined || req.session.userId <=0) {
        //no esta logueado.
        res.render("users/login", { titulo: "Mundo Mascota DH-Login" });
      } else {

        next();
        //si esta logueado , ejecutamos next() para seguir con la ejecucion.
      }
      
}

module.exports = userRouteMW;