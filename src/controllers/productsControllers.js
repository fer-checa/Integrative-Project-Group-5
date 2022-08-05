const fs = require("fs");
const path = require("path");

/* ELIMINARRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR */
const productsFilePath = path.join(__dirname, "../data/products.json");
/* ELIMINARRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR */

const { validationResult } = require("express-validator");
const db = require('../database/models');

const productsController = {


  index: (req, res) => {

    /*  let promGatos = db.Products.findAll();

    let promPerros = db.Products.findAll();

    Promise
    .all([promGatos, promPerros])
    .then(([Gatos, Perros]) => {
      res.render('index', { titulo: 'Mundo Mascota DH', Gatos, Perros });
    })
    .catch(error => res.send(error)) 
}, */

  /* const todosLosProductos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8')); 

    const Gatos = todosLosProductos.filter(function (product) {
      return product.categoria == 'Gatos'
    });
    const Perros = todosLosProductos.filter(function (product) {
      return product.categoria == 'Perros'
    });

    res.render('index', { titulo: 'Mundo Mascota DH', Gatos, Perros }); */
  },
 
  /* **************************************************************************************************************************** */

  todosLosProductos: (req, res) => {

    db.Products.findAll({
      include: [{association: "familyProducts"}, {association: "categoryAnimals"}]
  })
      .then((todosLosProductos) => {
     
        res.render("products/todosLosProductos", { titulo: "Mundo Mascota DH-Productos", todosLosProductos, });
      })
    /* 	.catch(function (error) {
        console.log(error);
      });  */
    /* const todosLosProductos = JSON.parse(fs.readFileSync(productsFilePath, "utf-8")); */
  },

  /* **************************************************************************************************************************** */

  productDetail: (req, res) => {

    db.Products.findByPk(req.params.id)
      .then((product) => {
        res.render("products/productDetail", { titulo: "Mundo Mascota DH-Detalle Producto", product, });
      })
      .catch(function (error) {
        console.log(error);
      })
    /* const todosLosProductos = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
    let id = req.params.id;
    let product = todosLosProductos.find((product) => product.id == id); */
  },

  /* **************************************************************************************************************************** */

  productCart: (req, res) => {
    res.render("products/productCart", { titulo: "Mundo Mascota DH-Carrito" });
  },

  /* **************************************************************************************************************************** */

  sucursales: (req, res) => {
    res.render("sucursales", { titulo: "Mundo Mascota DH-Sucursales" });
  },

  /* **************************************************************************************************************************** */

  productAdmin: (req, res) => {
    db.Products.findAll({
      include: [{association: "familyProducts"}, {association: "categoryAnimals"}]
})
      .then((todosLosProductos) => {
        //res.send(todosLosProductos.famili)
        res.render("products/productAdmin", { titulo: "Mundo Mascota DH-Productos Admin", todosLosProductos, });
      })
      .catch(function (error) {
        console.log(error);
      });
    /* const todosLosProductos = JSON.parse(fs.readFileSync(productsFilePath, "utf-8")); */
  },

  /* **************************************************************************************************************************** */

  New: (req, res) => {

    let promFamily = db.FamilyProducts.findAll();
    let promCategory = db.CategoryAnimals.findAll();

    Promise
      .all([promFamily, promCategory])
      .then(([allFamily, allCategory]) => {
        res.render("products/productNew", { titulo: "Mundo Mascota DH-Alta Producto", allFamily, allCategory })
      })
      .catch(error => res.send(error))
  },

  /* **************************************************************************************************************************** */
  
  create: (req, res) => {

    let errors = validationResult(req);

    if (errors.isEmpty()) {

      db.Products.create({
                
        name: req.body.nombre,
        description: req.body.descripcion,
        image: "/img/products/" + req.file.filename,         
        categoryAnimal_id: req.body.categoria, 
        familyProduct_id: req.body.familia,
        price: parseFloat(req.body.precio),           
        discount: parseFloat(req.body.descuento),
        date_release: req.body.release_date,
        user_id: 1,
        active: req.body.activo == "SI" ? 1 : 0


      },{
        include: [{association: "familyProducts"}, {association: "categoryAnimals"}]
    })
      .then((res.redirect("/admin/products")))

      .catch(function (error) {
          console.log(error);
        })

    } else {

      const alert = errors.array();

      return res.render("products/productNew", { titulo: "Mundo Mascota DH-Alta Producto", alert, old: req.body, });

    }
  },

  /* **************************************************************************************************************************** */
  /* let errors = validationResult(req);
  if (errors.isEmpty()) { const allProducts = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

    let newProduct = {
      id: parseInt(allProducts[allProducts.length - 1].id) + 1,
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      categoria: req.body.categoria,
      familia: req.body.familia,
      precio: parseFloat(req.body.precio),
      descuento: parseFloat(req.body.descuento),
      activo: req.body.activo == "SI" ? 1 : 0,
      imagen: "/img/products/" +  req.file.filename,
      usuario: "Admin",
    };

    allProducts.push(newProduct);
    fs.writeFileSync(productsFilePath,JSON.stringify(allProducts, null, " "));

    res.redirect("/admin/products");

  } else {
    const alert = errors.array();

    return res.render("products/productNew", {titulo: "Mundo Mascota DH-Alta Producto", alert, old: req.body, });
  } */


  /* **************************************************************************************************************************** */
  Edit: (req, res) => {

    let promProductToEdit = db.Products.findByPk(req.params.id) ;   
    let promFamily = db.FamilyProducts.findAll();
    let promCategory = db.CategoryAnimals.findAll();

    Promise
      .all([promFamily, promCategory, promProductToEdit])
      .then(([allFamily, allCategory, allProductToEdit]) => {
        res.send();
        res.render("products/productEdit", { titulo: "Mundo Mascota DH-Editar Producto", allFamily, allCategory, allProductToEdit});
      })
      .catch(error => res.send(error))

  },

  /*  res.render("products/productEdit", {titulo: "Mundo Mascota DH-Editar Producto", productToEdit,}); */
  /* const allProducts = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
  let productToEdit = allProducts.find((user) => req.params.id == user.id) */


  /* **************************************************************************************************************************** */
  update: (req, res) => {
    let errors = validationResult(req);


if (errors.isEmpty()) {
    db.Products.update({
                
        name: req.body.nombre,
        description: req.body.descripcion,
        image: "/img/products/" + req.file.filename,         
        categoryAnimal_id: req.body.categoria, 
        familyProduct_id: req.body.familia,
        price: parseFloat(req.body.precio),           
        discount: parseFloat(req.body.descuento),
        user_id: 1,
        active: req.body.activo == "SI" ? 1 : 0
    },
    {
      where : {id:req.params.id}
    })
    .then(res.redirect("/admin/products"))
    .catch(
      error => res.send(error)
      );
    } else {
      const alert = errors.array();
      return res.render("productEdit", { titulo: "Mundo Mascota DH-Editar Producto", alert, old: req.body });
  }
},

  /* **************************************************************************************************************************** */
  /* let errors = validationResult(req);
  if (errors.isEmpty()) {const allProducts = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
    let productToEdit = allProducts.find((prod) => req.params.id == prod.id);

    let editedProduct = {
      
      id: parseInt(req.params.id),
      name: req.body.nombre,
      descripcion: req.body.descripcion,
      imagen: req.file ? req.file.filename : productToEdit.imagen,
      categoria: req.body.categoria,
      familia: req.body.familia,
      precio: parseFloat(req.body.precio),
      descuento: parseFloat(req.body.descuento),
      fecha: req.body.fecha,
      usuario: "Admin",
      activo: req.body.activo == "SI" ? 1 : 0,
    };

    let indice = allProducts.findIndex((prod) => prod.id == req.params.id);
    allProducts[indice] = editedProduct;
    fs.writeFileSync(productsFilePath,JSON.stringify(allProducts, null, " ")
    );

    res.redirect("/admin/products");

   } else {
        const alert = errors.array();
        return res.render("productEdit", { titulo: "Mundo Mascota DH-Editar Producto", alert, old: req.body });
    }
}, 

*/

  /* **************************************************************************************************************************** */
  inactivar: (req, res) => {

    db.Products.update({

        user_id: 1,
        active: 0

    },
      {
        where: {
          id: req.params.id,
        }
      })

      .then(res.redirect("/admin/products"))

      .catch(function (error) {
        console.log(error);
      });

    },
    /* const todosLosProductos = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

    let unProd = todosLosProductos.filter((product) => product.id == req.params.id);

    let editProducto = {
      id: req.params.id,
      nombre: unProd[0].nombre,
      descripcion: unProd[0].descripcion,
      imagen: unProd[0].imagen,
      categoria: unProd[0].categoria,
      familia: unProd[0].familia,
      precio: unProd[0].precio,
      descuento: unProd[0].descuento,
      fecha: unProd[0].fecha,
      usuario: unProd[0].usuario,
      activo: 0,
    };

    let indice = todosLosProductos.findIndex(
      (product) => product.id == req.params.id
    );
    
    todosLosProductos[indice] = editProducto;
    fs.writeFileSync(productsFilePath, JSON.stringify(todosLosProductos, null, " ")
    );

    res.redirect("/admin/products"); */
  

  /* **************************************************************************************************************************** */

  activar: (req, res) => {

    db.Products.update({

      user_id: 1,
      active: 1

  },
    {
      where: {
        id: req.params.id,
      }
    })

    .then(res.redirect("/admin/products"))

    .catch(function (error) {
      console.log(error);
    });
  },
    /* const todosLosProductos = JSON.parse( fs.readFileSync(productsFilePath, "utf-8"));
    let unProd = todosLosProductos.filter((product) => product.id == req.params.id);

    let editProducto = {
      id: req.params.id,
      nombre: unProd[0].nombre,
      descripcion: unProd[0].descripcion,
      imagen: unProd[0].imagen,
      categoria: unProd[0].categoria,
      familia: unProd[0].familia,
      precio: unProd[0].precio,
      descuento: unProd[0].descuento,
      fecha: unProd[0].fecha,
      usuario: unProd[0].usuario,
      activo: 1,
    };

    let indice = todosLosProductos.findIndex( (product) => product.id == req.params.id);
    todosLosProductos[indice] = editProducto; fs.writeFileSync( productsFilePath, JSON.stringify(todosLosProductos, null, " "));

    res.redirect("/admin/products"); */
 

};

module.exports = productsController;
