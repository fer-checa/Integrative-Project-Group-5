const userRouteMW =  (req,res,next) => 
{
      //por session.  tiene que ser admin el usuario.
      req.session.idUser = 0;
      if (req.session.idUser == undefined || req.session.idUser <=0) {
        next();
      } else 
      {
        res.redirect('/user/profile/'+ req.session.idUser );
      } 
      
}

module.exports = userRouteMW;