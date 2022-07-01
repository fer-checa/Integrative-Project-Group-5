const fs = require('fs');
const path = require('path');

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

		let newCategory = {

			id: categoria[categoria.length - 1].id + 1,
			name: req.body.email,
			family: req.body.familia,
			user: req.body.user,
			activo: true,

		}
	},

}
module.exports = categoryController;
