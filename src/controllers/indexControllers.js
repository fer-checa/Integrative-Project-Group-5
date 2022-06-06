
const indexController = 
{
    index: (req, res) => 
    {
        res.render('index',{titulo:'Mundo Mascota DH'});        
    }


}


module.exports = indexController;