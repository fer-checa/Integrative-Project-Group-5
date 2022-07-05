const authRouteMW = (req, res, next) => {
  // Si NO tengo a alguien en session logueado que me redirija a la vista del LOGIN
  
  console.log('Auth'); 
  if (req.session.userLogged == undefined) {
    //     res.redirect('/user/login');
    res.render("users/login", { titulo: "Mundo Mascota DH - Profile" });
  } else {
    next();
  }
};

module.exports = authRouteMW;
