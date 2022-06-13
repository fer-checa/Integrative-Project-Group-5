const fs = require('fs');
const path = require('path');
/* Leemos el archivo JSON con todos los productos */
const productsFilePath = path.join(__dirname, '../data/products.json');

/* Renderisamos las vistas en el controlador */
const indexController =
{
	index: (req, res) => {
		/* Filtramos los productos mas visitados y los que estan en oferta */
		const todosLosProductos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		
		const visited = todosLosProductos.filter(function (product) {
			return product.category == 'visited'
		});
		const inSale = todosLosProductos.filter(function (product) {
			return product.category == 'in-sale'
		});
		res.render('index', { titulo: 'Mundo Mascota DH', visited, inSale });
	},

}
module.exports = indexController;





