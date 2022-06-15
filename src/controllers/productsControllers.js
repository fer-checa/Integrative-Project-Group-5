const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const todosLosProductos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const productsController = 
{
    index: (req, res) => {
        res.render('index',{titulo:'Mundo Mascota DH'});  
	},
    todosLosProductos: (req, res) => 
    {
        res.render('todosLosProductos',{titulo:'Mundo Mascota DH-Productos',todosLosProductos})        
    },
    productDetail: (req, res) => {
        const productsFilePath = path.join(__dirname, '../data/products.json');
        const todosLosProductos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        
		let id = req.params.id
		let product = todosLosProductos.find(product => product.id == id)
		res.render('productDetail',{titulo:'Mundo Mascota DH-Detalle Producto', product})

	}, 
    productCart: (req, res) => 
    {
        res.render('productCart', {titulo:'Mundo Mascota DH-Carrito'});   
            
    },
    sucursales: (req, res) => 
    {
        res.render('sucursales',{titulo:'Mundo Mascota DH-Sucursales'});        
    }
            
}
module.exports = productsController;


