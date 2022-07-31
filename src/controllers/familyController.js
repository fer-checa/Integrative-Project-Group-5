const fs = require("fs");
const path = require("path");

const familyFilePath = path.join(__dirname, "../data/family.json");

/* const db = require("../database/models"); */

const db = require('../database/models');

const familyController = {

  
  todasLasFamilias: (req, res) => {

    db.Users.findAll(
      //{attributes : ['id','name',]},
      {include : ['roles']}

   )
   .then((resultado) => 
   {
     res.send(resultado);
   })


    /* db.FamilyProducts.findAll().then((familias) => {
      res.render("products/familyAdmin", {
        titulo: "Mundo Mascota DH-Familia de Productos",
        familias,
      });
    }); */
  },

  new: (req, res) => {
    res.render("products/familyNew", {
      titulo: "Mundo Mascota DH-Alta de Familia Producto",
    });
  },


  create: (req, res) => {
    db.FamilyProducts.create({
      name: req.body.nombre,
      user_id: 2,
      active: req.body.activo == "SI" ? 1 : 0,
    })
    .then(res.redirect("/admin/family"))
    // const allFamily = JSON.parse(fs.readFileSync(familyFilePath, "utf-8"));
    // let newFamily = {
    //   id: parseInt(allFamily[allFamily.length - 1].id) + 1,
    //   nombre: req.body.nombre,
    //   usuario: "Admin",
    //   activo: req.body.activo == "SI" ? 1 : 0,
    // };
    // allFamily.push(newFamily);
    // fs.writeFileSync(familyFilePath, JSON.stringify(allFamily, null, " "));
    // res.redirect("/admin/family");
  },

  // family: (req, res) => {
  //   let familia = req.params.familia;
  //   familia = todosLosProductos.find((product) => product.familia == familia);
  //   res.render("familia", {
  //     titulo: "Mundo Mascota DH-Detalle Producto",
  //     familia,
  //   });
  // },

  Edit: (req, res) => {
    db.FamilyProducts.findByPk(req.params.id).then((familyToEdit) => {
      res.render("products/familyEdit", {
        titulo: "Mundo Mascota DH-Editar Familia de Productos",
        familyToEdit,
      });
    });

    // const allFamily = JSON.parse(fs.readFileSync(familyFilePath, "utf-8"));
    // let familyToEdit = allFamily.find((user) => req.params.id == user.id);
    // res.render("products/familyEdit", {
    //   titulo: "Mundo Mascota DH-Editar Familia",
    //   familyToEdit,
    // });
  },

  update: (req, res) => {
    //let errors = validationResult(req);
    //if (errors.isEmpty()) {
    const allFamily = JSON.parse(fs.readFileSync(familyFilePath, "utf-8"));
    //let familyToEdit = allFamily.find((prod) => req.params.id == prod.id);
    let editedFamily = {
      id: parseInt(req.params.id),
      nombre: req.body.nombre,
      usuario: "Admin",
      activo: req.body.activo == "SI" ? 1 : 0,
    };
    let indice = allFamily.findIndex((prod) => prod.id == req.params.id);
    allFamily[indice] = editedFamily;
    fs.writeFileSync(familyFilePath, JSON.stringify(allFamily, null, " "));
    res.redirect("/admin/family");
    //}
  },

  inactivar: (req, res) => {
    const todasLasFamilias = JSON.parse(
      fs.readFileSync(familyFilePath, "utf-8")
    );
    let unFam = todasLasFamilias.filter((family) => family.id == req.params.id);

    let editFamily = {
      id: req.params.id,
      nombre: unFam[0].nombre,
      usuario: unFam[0].usuario,
      activo: 0,
    };
    let indice = todasLasFamilias.findIndex(
      (family) => family.id == req.params.id
    );
    todasLasFamilias[indice] = editFamily;
    fs.writeFileSync(
      familyFilePath,
      JSON.stringify(todasLasFamilias, null, " ")
    );

    res.redirect("/admin/family");
  },

  activar: (req, res) => {
    const todasLasFamilias = JSON.parse(
      fs.readFileSync(familyFilePath, "utf-8")
    );
    let unFam = todasLasFamilias.filter((family) => family.id == req.params.id);

    let editFamily = {
      id: req.params.id,
      nombre: unFam[0].nombre,
      usuario: unFam[0].usuario,
      activo: 1,
    };

    let indice = todasLasFamilias.findIndex(
      (family) => family.id == req.params.id
    );
    todasLasFamilias[indice] = editFamily;
    fs.writeFileSync(
      familyFilePath,
      JSON.stringify(todasLasFamilias, null, " ")
    );

    res.redirect("/admin/family");
  },
};
module.exports = familyController;
