const fs = require('fs');
const path = require('path');

const familyFilePath = path.join(__dirname, '../data/family.json');


const categoryController =
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

		let newFamily = {

			id: familia[familia.length - 1].id + 1,
			name: req.body.email,
			family: req.body.familia,
			user: req.body.user,
			activo: true,

		}
	},

}
module.exports = familyController;
