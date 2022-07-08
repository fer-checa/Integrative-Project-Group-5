const express = require("express");
const session = require('express-session'); // Requerimos sesion, la inicializamos
const cookies = require('cookie-parser');
const path = require('path');

const app = express();

// const logMiddleware = require("./middlewares/logMiddleware");

const userLoggedMW= require('./middlewares/userLoggedMW');

app.use(session({
  secret: "Secreto", 
  resave: false,
  saveUninitialized: false
  
})); 
app.use(cookies());
app.use(userLoggedMW);

//Para el motodo POST
//Con esto se captura todo lo que viene de un formulario en forma de un objeto literal y luego
//convertirlo en formato JSON si queremos
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Carpeta archivos estaticos.
app.use(express.static("public"));

//ejs template in node js
//instalar paquete npm install ejs
//referencia
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));


//app.use(userLoggedMW);

// Se agrega la session para el inicion de session
// PASA COMO UN MIDDLEWARE

//Para el put/delete hay que instalar el npm instal method-override --save
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

// requerir archivos de rutas.
const indexRouter = require("./routers/indexRouter");
const userRouter = require("./routers/userRouter");
const productsRouter = require("./routers/productsRouter");
const footerRouter = require("./routers/footerRouter");
const adminRouter = require("./routers/adminRouter");

//Servidor.
app.listen(3050, () => {
  console.log("Servidor corriendo en http://localhost:3050");
});

//mapeo de rutas
app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/products", productsRouter);
app.use("/footer", footerRouter);
app.use("/admin", adminRouter);

app.use((req, res, next) => {
  res.status(404).render('404');
  next();
});
 