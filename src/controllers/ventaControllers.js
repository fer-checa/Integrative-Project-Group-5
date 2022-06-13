
const ventaController = 
{
    index: (req, res) => 
    {
        res.render('mascotas',{titulo:'Mundo Mascota DH-Productos'});        
    },

    marcas: (req, res) => 
    {
        res.render('marcas',{titulo:'Mundo Mascota DH-Marcas'});        
    },
    promociones: (req, res) => 
    {
        res.render('promociones',{titulo:'Mundo Mascota DH-Promociones'});        
    },
    productCart: (req, res) => 
    {
        res.render('productCart',{titulo:'Mundo Mascota DH-Carrito'});        
    },
    productDetail: (req, res) => 
    {
        res.render('productDetail',{titulo:'Mundo Mascota DH-Detalle Producto'});        
    },
    sucursales: (req, res) => 
    {
        res.render('sucursales',{titulo:'Mundo Mascota DH-Sucursales'});        
    },
    mascotas: (req, res) => 
    {
        res.render('mascotas',{titulo:'Mundo Mascota DH-Productos'});        
    },
    todosLosProductos: (req, res) => 
    {
        res.render('todosLosProductos',{titulo:'Mundo Mascota DH-Productos'});        
    },
    admin: (req, res) => 
    {
        res.render('admin',{titulo:'Mundo Mascota DH-ABM Producto'});        
    }
            
}


module.exports = ventaController;