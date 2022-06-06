const express = require('express');
const app = express();

const path= require('path');

//Carpeta archivos estaticos.
app.use(express.static("public"));

//ejs template in node js 
//instalar paquete npm install ejs 
//referencia
app.set("view engine", "ejs");
app.set('views',path.resolve(__dirname, 'views'));


// requerir archivos de rutas.
const indexRouter = require('./routers/indexRouter');
const seguridadRouter = require('./routers/seguridadRouter');
const ventaRouter = require('./routers/ventaRouter');


//Servidor.
app.listen(3050,() => {
    console.log("Servidor corriendo en http://localhost:3050");
});


//mapeo de rutas
app.use('/', indexRouter);
app.use('/seguridad', seguridadRouter);
app.use('/venta', ventaRouter);

