const fs = require("fs");
const path = require("path");
const usersFilePath = path.join(__dirname, "../data/usuarios.json");
const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");

const userController = {
  /* LOGIN */
  login: (req, res) => {
    req.session.userLogged = "PEPE";
    return res.render("users/login", { titulo: "Mundo Mascota DH-Login" });
  },

  /* INICIAR SESION */
  loginProcess: (req, res) => {
    
    /* aqui hacemos la comparacion contra el email que se loguea el usuario */
    const usuarios = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
    let userToLogin = usuarios.filter((x) => x.email == req.body.email);
	
    if (userToLogin.length > 0) {

      let isOkPassword = true;// bcryptjs.compareSync(req.body.password, userToLogin.password);

      if (isOkPassword) {
        // delete userToLogin.password; // Me elimina la contraseña para que no sea vista
        req.session.userLogged=userToLogin; // aca permance la sseccion, el usuario permanece logueado
        res.redirect('/');
       
      } else 
      {
        res.render("users/login",userLoggedMW, {
          titulo: "Mundo Mascosta DH - Login",
          errors: { email: { msg: "las credenciales son invalidas" } },
        });
      }
    } else {
      return res.render("users/login", {
        titulo: "Mundo Mascosta DH - Login",
        errors: { email: { msg: "No se encuentra en nuestra base de datos" } },
      });
    }
  },
  /* PERFIL DEL USUARIO*/
  profile: (req, res) =>
    //ACA VEO QUE ESTA CUANDO LA SESSION ACTIVA:
    {

      // const usuarios = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
      // let miUsuario = usuarios.filter((x) => x.email == req.body.email);
       res.render("users/profile", { titulo: "Mundo Mascosta DH - Profile"});
    },
  logout: (req, res) => {
    req.session.destroy(); // borra todo lo q esta en sesion, lo destruye
    console.log(re.session);
    return res.redirect("/"); // Redirecciona a la HOME
  },

  /* REGISTRACION */
  register: (req, res) => {
    // lo guardo por 30 seg en el navegador
    res.cookie("testing", "hola mundo", { maxAge: 1000 * 30 });
    res.render("users/register", { titulo: "Mundo Mascota DH-Register" });
  },

  create: (req, res) => {
    console.log(req.file);
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      const usuarios = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

      let newUser = {
        id: usuarios[usuarios.length - 1].id + 1,
        name: req.body.name,
        email: req.body.email,
        password: bcryptjs.hashSync(req.body.password, 10),
        /* rePassword: bcrypt.hashSync(req.body.rePassword, 10), */
        image: req.file.filename,
        isAdmin: 0,
      };

      usuarios.push(newUser);
      fs.writeFileSync(usersFilePath, JSON.stringify(usuarios, null, " "));

      res.redirect("/user/login");
    } else {
      return res.render("users/register", {
        titulo: "Mundo Mascota DH-Register",
        errors: errors.errors,
      });
    }
  },

  edit: (req, res) => {
    const usersFilePath = path.join(__dirname, "../data/usuarios.json");
    const usuarios = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
    const iduser = req.params.id;
    const userToEdit = usuarios.find((row) => {
      return row.id == iduser;
    });
    res.render("users/editar", { userToEdit, titulo: "Editar usuario" });
  },

  update: (req, res) => {
    const usuarios = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

    let userToEdit = usuarios.find((user) => req.params.id == user.id);

    let isAdminAux = req.body.isAdmin;
    if (isAdminAux == "on") {
      isAdminAux = 1;
    } else {
      isAdminAux = 0;
    }

    let editedUser = {
      id: req.params.id,
      name: req.body.name,
      email: req.body.email,
      password: userToEdit.password,
      isAdmin: isAdminAux,
      /* rePassword: req.body.rePassword, */
      // if ternario ===> condicion? verdadero : falso
      image: req.file ? req.file.filename : userToEdit.image,
    };

    let indice = usuarios.findIndex((user) => user.id == req.params.id);
    usuarios[indice] = editedUser;

    fs.writeFileSync(usersFilePath, JSON.stringify(usuarios, null, " "));
    res.redirect("/user/list");
  },

  list: function (req, res) {
    /* let archivoJSON = fs.readFileSync('usuarios.json', {encoding : 'utf-8'}); */
    /* let lista = JSON.parse(archivoJSON); */

    const usuarios = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

    res.render("users/users", { usuarios, titulo: "Lista usuarios" });
  },

  destroy: (req, res) => {
    const usuarios = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
    let finalUsuarios = usuarios.filter(
      (product) => product.id != req.params.id
    );
    fs.writeFileSync(usersFilePath, JSON.stringify(finalUsuarios, null, " "));
    res.redirect("/user/list");
  },
};

module.exports = userController;
