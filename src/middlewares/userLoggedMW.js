const userLoggedMW = (req, res, next) => {
  // setea esto para que pueda ser visto en cualquier vista
// console.log("Paso por aca : " + req.session.userLogged);
  if (req.session == undefined) {
    res.locals.isLogged = false;
  } else {
    if (req.session.userLogged == undefined) {
      res.locals.isLogged = false;
    } else {
      if (req.session.userLogged.length > 0) {
        res.locals.isLogged = true;
      }
    }
  }
  
  // if ( req.session.userLogged== undefined) {
  //     res.locals.isLogged = false;
  //     /* res.locals.userLogged = req.session.userLogged; */
  // } else {res.locals.isLogged = true;}

  next();
};

module.exports = userLoggedMW;
