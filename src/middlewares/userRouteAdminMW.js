const userRouteAdminMW = (req, res, next) => {
  //por session.  tiene que ser admin el usuario.
  res.locals.isAdmin = false;
  if (req.session.userLogged == undefined) {
    res.redirect("/user/login");
    //res.render("users/login", { titulo: "Mundo Mascota DH-Login" });
  } else {
    if (req.session.userLogged.isAdmin !=undefined) {
      if (req.session.userLogged.isAdmin == 1) {
        res.locals.isAdmin = true;
      } else {
        res.render("noAuthorization", {
          titulo: "Mundo Mascota DH- No Authorization",
        });
      }
    }
  }
  next();
};

module.exports = userRouteAdminMW;
