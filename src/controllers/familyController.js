const fs = require('fs');
const path = require('path');

const familyFilePath = path.join(__dirname, '../data/family.json');


const familyController =
{
	todasLasFamilias: (req, res) => {
		const familias = JSON.parse(fs.readFileSync(familyFilePath, 'utf-8'));
		res.render('products/TodasLasFamilias', { titulo: 'Mundo Mascota DH-Productos', familias })
	},
	family: (req, res) => {
		let familia = req.params.familia
		familia = todosLosProductos.find(product => product.familia == familia)
		res.render('familia', { titulo: 'Mundo Mascota DH-Detalle Producto', familia })
	},

	create: (req, res) => {
		let errors = validationResult(req);
		if (errors.isEmpty()) {
		  const allFamily = JSON.parse(
			fs.readFileSync(familyFilePath, "utf-8")
		  );
		  let newFamily = {
			id: parseInt(allFamily[allFamily.length - 1].id) + 1,
			nombre: req.body.nombre,
			activo: req.body.activo == "SI" ? 1 : 0,
			usuario: "Admin",
		  };
		  allFamily.push(newFamily);
		  fs.writeFileSync(
			familyFilePath,
			JSON.stringify(allFamily, null, " ")
		  );
		  res.redirect("/products/family");
		} else {
		  const alert = errors.array();
		  return res.render("products/familyNew", {
			titulo: "Mundo Mascota DH-Alta Producto",
			alert,
			old: req.body,
		  });
		}
	  },

	Edit: (req, res) => {
		const allFamily = JSON.parse(fs.readFileSync(familyFilePath, "utf-8"));
		let familyToEdit = allFamily.find((user) => req.params.id == user.id);
		res.render("products/family", {
		  titulo: "Mundo Mascota DH-Editar Producto",
		  familyToEdit,
		});
	  },

	  update: (req, res) => {
		let errors = validationResult(req);
		if (errors.isEmpty()) {
		  const allFamily = JSON.parse(
			fs.readFileSync(familyFilePath, "utf-8")
		  );
		  let familyToEdit = allFamily.find((prod) => req.params.id == prod.id);
		  let editedFamily = {
			id: parseInt(req.params.id),
			nombre: req.body.nombre,
			usuario: "Admin",
			activo: req.body.activo == "SI" ? 1 : 0,
		  };
		  let indice = allFamily.findIndex((prod) => prod.id == req.params.id);
		  allFamily[indice] = editedFamily;
		  fs.writeFileSync(
			familyFilePath,
			JSON.stringify(allFamily, null, " ")
		  );
		  res.redirect("/products/family");
		  }

	  },

	  inactivar: (req, res) => {
		const todasLasFamilias = JSON.parse(
		  fs.readFileSync(familyFilePath, "utf-8")
		);
		let unFam = todasLasFamilias.filter(
		  (family) => family.id == req.params.id
		);
	
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
	
		res.redirect("/products/family");
	  },
	
	  activar: (req, res) => {
		const todasLasFamilias = JSON.parse(
		  fs.readFileSync(familyFilePath, "utf-8")
		);
		let unFam = todasLasFamilias.filter(
		  (family) => family.id == req.params.id
		);
	
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
	
		res.redirect("/products/family");
	  },

}
module.exports = familyController;
