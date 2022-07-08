const User = require('../models/User');

const userLoggedMW = (req, res, next) => {
	res.locals.isLogged = false;

	let emailInCookie = req.cookies.userEmail;
	let userFromCookie = User.findByField('email', emailInCookie);
  

	if (userFromCookie) {
		req.session.userLogged = userFromCookie;
	}

	if (req.session.userLogged) {
		res.locals.isLogged = true;
		res.locals.userLogged = req.session.userLogged;
	}

    
  

	next();
}

module.exports = userLoggedMW;

//CODIGO ANTERIOR
/* 
const userLoggedMW = (req, res, next) => {
 
  if (req.session == undefined) {
    res.locals.isLogged = false;
  } else {
    if (req.session.userLogged == undefined) {
      res.locals.isLogged = false;
    } else {
      if (req.session.userLogged.length > 0) {
        res.locals.isLogged = true;
        if (req.session.userLogged[0].isAdmin == 1) {
          res.locals.isAdmin = true;
        }
      }
    }
  }
  
  next();
}; */

