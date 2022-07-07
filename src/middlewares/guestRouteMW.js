const guestRouteMW = (req, res, next) => {
    // Si tengo a alguien en session logueado que me redirija a la vista del PERFIL
    if (req.session.userLogged==true) {
        // res.redirect('/user/profile')
        res.render('users/profile',{titulo: "Mundo Mascota DH - Profile"});
    }
    next();
}
module.exports = guestRouteMW;