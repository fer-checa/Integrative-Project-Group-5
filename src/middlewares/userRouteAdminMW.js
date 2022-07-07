const userRouteAdminMW = (req, res, next) => {
  //por session.  tiene que ser admin el usuario.
  
  if (req.session.userLogged == undefined) {
    res.redirect("/user/login");
    //res.render("users/login", { titulo: "Mundo Mascota DH-Login" });
  } else {
    if (req.session.userLogged.length > 0) {
      if (req.session.userLogged[0].isAdmin == 1) {
        res.locals.isAdmin = true;
        next();
      } else {
        res.render("noAuthorization", {
          titulo: "Mundo Mascota DH- No Authorization",
        });
      }
    }
  }

  //if (req.session.userLog == undefined ) {
  //   //no esta logueado.
  //   res.render("user/login", { titulo: "Mundo Mascota DH-Login" });
  // } else if(req.session.userLog.esAdmin==0)
  // {
  //   res.render("noAuthorization", { titulo: "Mundo Mascota DH- No Authorization" });
  // }
  // else {
  //   //si esta logueado , ejecutamos next() para seguir con la ejecucion.
  //   next();
  // }
};

module.exports = userRouteAdminMW;
