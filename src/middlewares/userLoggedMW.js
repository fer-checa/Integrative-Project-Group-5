//const User = require('../models/User');

const db = require("../database/models");

const userLoggedMW = (req, res, next) => {
  res.locals.isLogged = false;
  res.locals.isAdmin = false;

  // let emailInCookie = req.cookies.userEmail;

  //if (emailInCookie)
  //{
  //let userFromCookie = User.findByField('email', emailInCookie);

  if (req.cookies.userEmail == undefined) {
    if (req.session.userLogged) {
      res.locals.isLogged = true;
      res.locals.userLogged = req.session.userLogged;

      if (req.session.userLogged.role_id == 1) {
        res.locals.isAdmin = true;
      }
    }
    next();
  } else {
    db.Users.findOne({ where: { email: req.cookies.userEmail } })
      .then((userFromCookie) => {
        req.session.userLogged = userFromCookie;
        if (req.session.userLogged) {
          res.locals.isLogged = true;
          res.locals.userLogged = req.session.userLogged;

          if (req.session.userLogged.role_id == 1) {
            res.locals.isAdmin = true;
          }
        }
        next();
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

//};

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
