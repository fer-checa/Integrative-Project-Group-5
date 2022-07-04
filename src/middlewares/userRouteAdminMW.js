const userRouteAdminMW = (req, res, next) => {
    //por session.  tiene que ser admin el usuario.
  req.session.idUser = 1;
    
    
  if (req.session.userLog == undefined ) {
    //no esta logueado.
    res.render("user/login", { titulo: "Mundo Mascota DH-Login" });
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
