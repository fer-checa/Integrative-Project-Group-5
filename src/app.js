const express = require('express');
const app = express();
const path = require('path');


//Carpeta archivos estaticos.
app.use(express.static("public"));

//ejs template in node js 
//instalar paquete npm install ejs 
//referencia
app.set("view engine", "ejs");
app.set('views',path.resolve(__dirname, 'views'));

//Para el motodo POST
//Con esto se captura todo lo que viene de un formulario en forma de un objeto literal y luego
//convertirlo en formato JSON si queremos
app.use(express.urlencoded({ extended : false}));
app.use(express.json());

//Para el put/delete hay que instalar el npm instal method-override --save
const methodOverride = require('method-override');
app.use(methodOverride("_method"));

// requerir archivos de rutas.
const indexRouter = require('./routers/indexRouter');
const userRouter = require('./routers/userRouter');
const ventaRouter = require('./routers/ventaRouter');
const footerRouter = require('./routers/footerRouter')

//Servidor.
app.listen(3050,() => {
    console.log("Servidor corriendo en http://localhost:3050");
});


//mapeo de rutas
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/venta', ventaRouter);
app.use('/footer', footerRouter);

