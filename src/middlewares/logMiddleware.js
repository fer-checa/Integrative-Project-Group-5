const fs= require('fs');

function logMiddleware (req,res,next) 
{   
    const fecha = new Date();
    
    fs.appendFileSync('log.txt','Se ingreso en la página ' + req.url + ' el ' +  fecha + '\n') ;
    next();
}
module.exports= logMiddleware;