const userLoggedMW = (req, res, next) => {
    // setea esto para que pueda ser visto en cualquier vista
                       
    res.locals.isLogged = false;
    // if ( req.session.userLogged==true) {
    //     res.locals.isLogged = true;
    //     /* res.locals.userLogged = req.session.userLogged; */
    // } 

    next();
}

module.exports = userLoggedMW;