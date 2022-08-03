const userRouteAdminMW = (req, res, next) => {
  //por session.  tiene que ser admin el usuario.
  res.locals.isAdmin = false;
  
  if (req.session.userLogged == undefined) {
    res.redirect("/user/login");
    
  } else {
   
    if (req.session.userLogged.role_id !=undefined) {
      
      console.log(req.session);
      if (req.session.userLogged.role_id == 1) {
        res.locals.isAdmin = true;
      } 
      else 
      {
        res.render("noAuthorization", {titulo: "Mundo Mascota DH- No Authorization",});
      }
    }
  }
  next();
};

module.exports = userRouteAdminMW;
