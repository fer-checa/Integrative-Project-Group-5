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
    },
    productAdmin : (req,res) => 
    {
        const todosLosProductos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        res.render('productAdmin',{titulo:'Mundo Mascota DH-Productos Admin',todosLosProductos});        
    },
    
    productNew : (req, res) =>{
        res.render('productNew', {titulo: "Mundo Mascota DH-Alta Producto"})
    },

    productEdit : (req, res) =>{
        res.render('productEdit', {titulo: "Mundo Mascota DH-Editar Producto"})
    },


    destroy : (req, res) => {
        const todosLosProductos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        let unProd = todosLosProductos.filter(product => product.id == req.params.id)

        let editProducto = {
			id: req.params.id,
			nombre: unProd[0].nombre,
			descripción: unProd[0].descripción,
            imagen: unProd[0].imagen,
            categoria: unProd[0].categoria,
            familia: unProd[0].familia,
            precio: unProd[0].precio,
            descuento: unProd[0].descuento,
            fecha: unProd[0].fecha,
            usuario: unProd[0].usuario,
            activo: false,
		}
        let indice = todosLosProductos.findIndex(product => product.id == req.params.id);
		todosLosProductos[indice] = editProducto;
		fs.writeFileSync(productsFilePath, JSON.stringify(todosLosProductos, null, " "));
        
        res.redirect("/products/productAdmin");
	}
            
}
module.exports = productsController;


