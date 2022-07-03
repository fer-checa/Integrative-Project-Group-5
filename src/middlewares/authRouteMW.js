const authRouteMW = (req, res, next) => {
     // Si NO tengo a alguien en session logueado que me redirija a la vista del LOGIN
    if (!req.session.userLogged) {
        return res.redirect('/user/login')
    }
    next();
}

module.exports = authRouteMW;