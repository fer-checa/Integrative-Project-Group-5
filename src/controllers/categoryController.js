const { Console } = require('console');
const fs = require('fs');
const path = require('path');
const { validationResult } = require("express-validator");
/* const categoryFilePath = path.join(__dirname, '../data/category.json'); */

const db = require('../database/models');

const categoryController =
{
	todasLasCategorias: function (req, res) {

		db.CategoryAnimals.findAll()
			.then((categorias) => {
				/* console.log(CategoryAnimals); */
				res.render('products/categoryAdmin', { titulo: 'Mundo Mascota DH-Productos', categorias} )
		 	}) 
			.catch(function (error) {
				console.log(error);
			}); 

		/* const categorias = JSON.parse(fs.readFileSync(categoryFilePath, 'utf-8'));
		res.render('products/categoryAdmin', { titulo: 'Mundo Mascota DH-Productos', categorias }) */ 
	},

	/* ******************************************************************** */
	/* NO MIDUFICAR */
	new: (req, res) => {
		res.render("products/categoryNew", { titulo: "Mundo Mascota DH-Alta de Categoria Producto" });
	},

	
	/* ******************************************************************** */
	create: function (req, res) {
		let errors = validationResult(req);
    
		if (errors.isEmpty()) {
		db.CategoryAnimals.create({
			name: req.body.nombre,
			user_id: req.session.userLogged.id,
			active: req.body.activo == "SI" ? 1 : 0,
		})
		.then(res.redirect("/admin/category"))

		.catch(function (error) {
				console.log(error);
			});

		} else {
			return res.render("products/categoryNew", {
			  titulo: "Mundo Mascota DH-Alta de Categoria Producto",
			  errors: errors.errors,
			});
		  }
		},	

		/* .then(Function(categoryAnimal) {
		  return res.redirect("/admin/category")
		}) */
		/* ******************************************************************** */

		//let errors = validationResult(req);
		// if (errors.isEmpty()) {
		/* const allCategory = JSON.parse(fs.readFileSync(categoryFilePath, "utf-8"));
		  let newCategory = {
			id: parseInt(allCategory[allCategory.length - 1].id) + 1,
			nombre: req.body.nombre,
			usuario: "Admin",
			activo: req.body.activo == "SI" ? 1 : 0
		  };
		  allCategory.push(newCategory);
		  fs.writeFileSync(
			categoryFilePath,
			JSON.stringify(allCategory, null, " ")
		  ); */

	


	/* ******************************************************************** */
	/* NO MIDUFICAR */
	/* category: (req, res) => {
		let categoria = req.params.categoria
		categoria = todosLosProductos.find(product => product.categoria == categoria)
		res.render('category', { titulo: 'Mundo Mascota DH-Detalle ', categoria })
	}, */

	/* ******************************************************************** */
	Edit: (req, res) => {
		/* const allCategory = JSON.parse(fs.readFileSync(categoryFilePath, "utf-8"));
		let categoryToEdit = allCategory.find((user) => req.params.id == user.id); */
		
		db.CategoryAnimals.findByPk(req.params.id)
		.then((categoryToEdit) => {
			
			res.render("products/categoryEdit", {titulo: "Mundo Mascota DH-Editar Producto", categoryToEdit})

		})
		.catch(function (error) {
		console.log(error);
		});
	},
	
	/* ******************************************************************** */
	update: (req, res) => {

		db.CategoryAnimals.update({ 
			name: req.body.nombre,
			user_id: req.session.userLogged.id,
			active: req.body.activo == "SI" ? 1 : 0,
		}, 
		{ 
			where: {
			id:req.params.id
		}})

		.then(res.redirect("/admin/category"))

		.catch(function (error) {
			console.log(error);
			});

		/* //let errors = validationResult(req);

		// if (errors.isEmpty()) {
		const allCategory = JSON.parse(fs.readFileSync(categoryFilePath, "utf-8"));
		//let categoryToEdit = allCategory.find((x) => req.params.id == x.id);

		let editedCategory = {
			id: parseInt(req.params.id),
			nombre: req.body.nombre,
			usuario: "Admin",
			activo: req.body.activo == "SI" ? 1 : 0,
		};

		let indice = allCategory.findIndex((x) => x.id == req.params.id);
		allCategory[indice] = editedCategory;
		fs.writeFileSync(
			categoryFilePath,
			JSON.stringify(allCategory, null, " ")
		);
		res.redirect("/admin/category");
		//} */

	},

	inactivar: (req, res) => {

		db.CategoryAnimals.update({ 
			user_id: req.session.userLogged.id,
			active: 0
		}, 
		{ 
			where: {
			id: req.params.id
		}})

		.then(res.redirect("/admin/category"))

		.catch(function (error) {
			console.log(error);
			});

		/* const todasLasCategorias = JSON.parse(
			fs.readFileSync(categoryFilePath, "utf-8")
		);
		let unCatego = todasLasCategorias.filter(
			(category) => category.id == req.params.id
		);

		let editCategory = {
			id: req.params.id,
			nombre: unCatego[0].nombre,
			usuario: unCatego[0].usuario,
			activo: 0,
		};
		let indice = todasLasCategorias.findIndex(
			(category) => category.id == req.params.id
		);
		todasLasCategorias[indice] = editCategory;
		fs.writeFileSync(
			categoryFilePath,
			JSON.stringify(todasLasCategorias, null, " ")
		);

		res.redirect("/admin/category"); */
	},

	activar: (req, res) => {

		db.CategoryAnimals.update({ 
			user_id: req.session.userLogged.id,
			active: 1
		}, 
		{ 
			where: {
			id: req.params.id
		}})

		.then(res.redirect("/admin/category"))

		.catch(function (error) {
			console.log(error);
			});



		/* const todasLasCategorias = JSON.parse(
			fs.readFileSync(categoryFilePath, "utf-8")
		);
		let unCatego = todasLasCategorias.filter(
			(category) => category.id == req.params.id
		);

		let editCategory = {
			id: req.params.id,
			nombre: unCatego[0].nombre,
			usuario: unCatego[0].usuario,
			activo: 1,
		};

		let indice = todasLasCategorias.findIndex(
			(category) => category.id == req.params.id
		);
		todasLasCategorias[indice] = editCategory;
		fs.writeFileSync(
			categoryFilePath,
			JSON.stringify(todasLasCategorias, null, " ")
		);

		res.redirect("/admin/category"); */
	},
};

module.exports = categoryController;
