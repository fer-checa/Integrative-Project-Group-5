const userRouteAdminMW = (req, res, next) => {
    //por session.  tiene que ser admin el usuario.
<<<<<<< HEAD
  req.session.idUser = 1;
    
=======
  let usr = 
  {id:1, esAdmin:0}
  
  req.session.userLog = usr;
>>>>>>> e8929121154cd10105210bf263452de4bf8091a3
    
  if (req.session.userLog == undefined ) {
    //no esta logueado.
    res.render("users/login", { titulo: "Mundo Mascota DH-Login" });
  } else if(req.session.userLog.esAdmin==0)
  {
    res.render("noAuthorization", { titulo: "Mundo Mascota DH- No Authorization" });
  } 
  else {
    //si esta logueado , ejecutamos next() para seguir con la ejecucion.
    next();
  }
  
  
  
};

module.exports = userRouteAdminMW;
