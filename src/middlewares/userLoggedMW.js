function userLoggedMW(req, res, next){
    // setea esto para que pueda ser visto en cualquier vista
    res.locals.isLogged = false;

    if (req.session && req.session.userLogged) {
        res.locals.isLogged = true; 
    }
    next();
}


module.exports = userLoggedMW;