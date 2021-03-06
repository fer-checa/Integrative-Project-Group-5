const fs = require('fs');
const path = require('path');
/* Leemos el archivo JSON con todos los productos */
const productsFilePath = path.join(__dirname, '../data/products.json');

/* Renderisamos las vistas en el controlador */
const indexController =
{
	index: (req, res) => {
		
		const todosLosProductos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		
		const Gatos = todosLosProductos.filter(function (product) {
			return product.categoria == 'Gatos'
		});
		const Perros = todosLosProductos.filter(function (product) {
			return product.categoria == 'Perros'
		});
		
		res.render('index', { titulo: 'Mundo Mascota DH', Gatos, Perros });

	},

}
module.exports = indexController;





