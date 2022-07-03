const express = require("express");
const app = express();
const path = require('path');
const session = require('express-session'); // Requerimos sesion, la inicializamos

const logMiddleware = require("./middlewares/logMiddleware");

const userLoggedMW= require('./middlewares/userLoggedMW');

//Carpeta archivos estaticos.
app.use(express.static("public"));

//ejs template in node js
//instalar paquete npm install ejs
//referencia
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

app.use(userLoggedMW);

app.use(logMiddleware);



//Para el motodo POST
//Con esto se captura todo lo que viene de un formulario en forma de un objeto literal y luego
//convertirlo en formato JSON si queremos
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Se agrega la session para el inicion de session
// PASA COMO UN MIDDLEWARE
app.use(session({
    secret: "Secreto", 
    resave: false,
    saveUninitialized: false

})); 

//Para el put/delete hay que instalar el npm instal method-override --save
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

// requerir archivos de rutas.
const indexRouter = require("./routers/indexRouter");
const userRouter = require("./routers/userRouter");
const productsRouter = require("./routers/productsRouter");
const footerRouter = require("./routers/footerRouter");
const adminRouter = require("./routers/adminRouter");
const categoryRouter = require("./routers/categoryRouter");

//Servidor.
app.listen(3050, () => {
  console.log("Servidor corriendo en http://localhost:3050");
});

//mapeo de rutas
app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/products", productsRouter);
app.use("/footer", footerRouter);
app.use("/category", categoryRouter);

app.use("/admin", adminRouter);

app.use((req, res, next) => {
  res.status(404).render('404');
  next();
});
 