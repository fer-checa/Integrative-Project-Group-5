const fs = require('fs');
const path = require('path');
const { all } = require('../routers/categoryRouter');

const categoryFilePath = path.join(__dirname, '../data/category.json');


const categoryController =
{
	todasLasCategorias: (req, res) => {
		const categorias = JSON.parse(fs.readFileSync(categoryFilePath, 'utf-8'));
		res.render('products/todasLasCategorias', { titulo: 'Mundo Mascota DH-Productos', categorias })
	},
	category: (req, res) => {
		let categoria = req.params.categoria
		categoria = todosLosProductos.find(product => product.categoria == categoria)
		res.render('category', { titulo: 'Mundo Mascota DH-Detalle Producto', categoria })
	},

	create: (req, res) => {
		let errors = validationResult(req);
		if (errors.isEmpty()) {
		  const allCategory = JSON.parse(
			fs.readFileSync(categoryFilePath, "utf-8")
		  );
		  let newCategory = {
			id: parseInt(allCategory[allCategory.length - 1].id) + 1,
			nombre: req.body.nombre,
			activo: req.body.activo == "SI" ? 1 : 0,
			usuario: "Admin",
		  };
		  allCategory.push(newCategory);
		  fs.writeFileSync(
			categoryFilePath,
			JSON.stringify(allCategory, null, " ")
		  );
		  res.redirect("/products/category");
		} else {
		  const alert = errors.array();
		  return res.render("products/categoryNew", {
			titulo: "Mundo Mascota DH-Alta Producto",
			alert,
			old: req.body,
		  });
		}
	  },

	Edit: (req, res) => {
		const allCategory = JSON.parse(fs.readFileSync(categoryFilePath, "utf-8"));
		let categoryToEdit = allCategory.find((user) => req.params.id == user.id);
		res.render("products/category", {
		  titulo: "Mundo Mascota DH-Editar Producto",
		  categoryToEdit,
		});
	  },

	  update: (req, res) => {
		let errors = validationResult(req);
		if (errors.isEmpty()) {
		  const allCategory = JSON.parse(
			fs.readFileSync(categoryFilePath, "utf-8")
		  );
		  let categoryToEdit = allCategory.find((prod) => req.params.id == prod.id);
		  let editedCategory = {
			id: parseInt(req.params.id),
			nombre: req.body.nombre,
			usuario: "Admin",
			activo: req.body.activo == "SI" ? 1 : 0,
		  };
		  let indice = allCategory.findIndex((prod) => prod.id == req.params.id);
		  allCategory[indice] = editedCategory;
		  fs.writeFileSync(
			categoryFilePath,
			JSON.stringify(allCategory, null, " ")
		  );
		  res.redirect("/products/category");
		  }

	  },

	  inactivar: (req, res) => {
		const todasLasCategorias = JSON.parse(
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
	
		res.redirect("/products/category");
	  },
	
	  activar: (req, res) => {
		const todasLasCategorias = JSON.parse(
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
	
		res.redirect("/products/category");
	  },
	};

module.exports = categoryController;
