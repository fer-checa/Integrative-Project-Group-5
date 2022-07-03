

const userRouteMW =  (req,res,next) => 
{
      //por session.  tiene que ser admin el usuario.
      req.session.userId = 0;
      if (req.session.userId == undefined || req.session.userId <=0) {
        //no esta logueado.
        res.render("users/login", { titulo: "Mundo Mascota DH-Login" });
      } else {
        //si esta logueado , ejecutamos next() para seguir con la ejecucion.
        next();
      }
      
}

module.exports = userRouteMW;