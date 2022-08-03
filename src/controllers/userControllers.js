const fs = require("fs");
const path = require("path");
const usersFilePath = path.join(__dirname, "../data/usuarios.json");
const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");

//const User = require("../models/User");

const db = require("../database/models");

const userController = {
  list: function (req, res) {
    /* let archivoJSON = fs.readFileSync('usuarios.json', {encoding : 'utf-8'}); */
    /* let lista = JSON.parse(archivoJSON); */

    //const usuarios = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
    //res.render("users/users", { usuarios, titulo: "Lista usuarios" });

    db.Users.findAll({
      //include : 'roles' ,
      //attributes : ['id','name','email', 'role_id']
    }).then((usuarios) => {
      let pepe = require('./familyController');

      console.log(pepe.todasLasFamilias1());
      console.log('pepep');
      res.render("users/users", { usuarios, titulo: "Lista usuarios" });
    });
  },

  register: (req, res) => {
    res.render("users/register", { titulo: "Mundo Mascota DH-Register" });
  },

  create: (req, res) => {
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      db.Users.create({
        name: req.body.name,
        email: req.body.email,
        password: bcryptjs.hashSync(req.body.password, 10),
        image: req.file.filename,
      })
        .then(() => {
          res.redirect("/user/login");
        })
        .catch((error) => {
          console.log;
        });

      // const usuarios = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

      // let newUser = {
      //   id: usuarios[usuarios.length - 1].id + 1,
      //   name: req.body.name,
      //   email: req.body.email,
      //   password: bcryptjs.hashSync(req.body.password, 10),
      //   image: req.file.filename,
      //   isAdmin: 0,
      // };

      // usuarios.push(newUser);
      // fs.writeFileSync(usersFilePath, JSON.stringify(usuarios, null, " "));
    } else {
      return res.render("users/register", {
        titulo: "Mundo Mascota DH-Register",
        errors: errors.errors,
      });
    }
  },

  login: (req, res) => {
    return res.render("users/login", { titulo: "Mundo Mascota DH-Login" });
  },

  loginProcess: (req, res) => {
    //let userToLogin = User.findByField("email", req.body.email);
    db.Users.findOne({where : {email :req.body.email}})
    .then((userToLogin)=> 
    {
      if (userToLogin) {
        let isOkThePassword =  bcryptjs.compareSync(req.body.password,userToLogin.password)
        
        if (isOkThePassword) {
          delete userToLogin.password;
          req.session.userLogged = userToLogin;
  
          if (req.body.remember_user) {
            res.cookie("userEmail", req.body.email, { maxAge: 1000 * 60 * 60 });
          }
  
          return res.redirect("/user/profile");
        }
        return res.render("users/login", {
          titulo: "Mundo Mascota DH-Login",
          errors: {
            email: {
              msg: "Las credenciales son inválidas",
            },
          },
        });
      }
  
      return res.render("users/login", {
        titulo: "Mundo Mascota DH-Login",
        errors: {
          email: {
            msg: "No se encuentra este email en nuestra base de datos",
          },
        },
      });
    })
    
  },

  profile: (req, res) => {
    return res.render("users/profile", {
      titulo: "Mundo Mascota DH- Profile",
      user: req.session.userLogged,
    });
  },

  logout: (req, res) => {
    res.clearCookie("userEmail");
    req.session.destroy();
    return res.redirect("/");
  },

  edit: (req, res) => {
    db.Users.findByPk(req.params.id)
    .then((userToEdit)=> 
    {
      res.render("users/editar", { userToEdit, titulo: "Editar usuario" });
    })
    .catch((error)=>
    {
      res.send(error);
    })
    // const usersFilePath = path.join(__dirname, "../data/usuarios.json");
    // const usuarios = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
    // const iduser = req.params.id;
    // const userToEdit = usuarios.find((row) => {
    //   return row.id == iduser;
    // });
    // res.render("users/editar", { userToEdit, titulo: "Editar usuario" });
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
