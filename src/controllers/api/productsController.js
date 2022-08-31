const db = require('../../database/models');
const sequelize = db.sequelize;
const moment = require('moment');
const path = require('path');
const { Op } = require("sequelize");
const productsController = {


'list': (req, res) => {

    db.Products.findAll({
        include: ['categoryAnimals','familyProducts']
    })
    
            .then(products => {
               return res.json({
              
                       meta : {
                           status: 200,
                           Count: products.length,
                           
                           url :"api/products"
                       },
                        data: products
                           
               })

})
},

/* 'detail': (req, res) => {

    db.Products.findByPk(req.params.id, {
        include: ['categoryAnimals','familyProducts']
    })
    .then(products => {
        return res.json({
       
                meta : {
                    status: 200,
                    total: products.length,
                    url :"api/products/:id"
                }, */
                 /* data: {
                    id: products.id,
                    name: products.name,
                    description: products.description,
                    image: products.image,
                    categoryAnimal_id: products.categoryAnimal_id,
                    familyProduct_id: products.familyProduct_id,
                    price: products.price,
                    discount: products.discount,
                    date_release: products.date_release,
                    user_id: products.user_id,
                    active: products.active,
                 } */
                 
                    
       /*  }) */

/* }) */

/* } */

'detail': (req, res) => {
    db.Products.findByPk(req.params.id,
        {
            include : ['categoryAnimals','familyProducts']
        })
        .then(products => {
            let respuesta = {
                meta: {
                    status: 200,
                    Count: products.length,
                    url: '/api/products/:id'
                },
                data: products
            }
          /*   const listProducts = catchAsync(async (req,res = res, next) => {
                const { page = 0, size = 5} = req.query;
                let pageSize = {
                    limit: +size,
                    offset:(+page) * (+size)
                }
                const { count, rows} = await Products.findAndCountAll(pageSize)
            
                res.json({
                    status: 'Productos  paginados', products
                })
            }); */
            res.json(respuesta)
        });
}
}



module.exports = productsController;