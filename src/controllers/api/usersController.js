const db = require('../../database/models');
const sequelize = db.sequelize;
const moment = require('moment');
const path = require('path');
const { Op } = require("sequelize");
const usersController = {


    'list': (req, res) => {

        db.Users.findAll({
            attributes: ['id', 'name','email'],
            // include: ['roles']
        })
        
                .then(users => {
                   return res.json({
                  
                           meta : {
                               status: 200,
                               Count: users.length,
                               url :"api/users"
                           },

                            data: 
                            {users}
                   })
    })
    },
    
    'detail': (req, res) => {
        db.Users.findByPk(req.params.id,
            {
                // attributes: ['id', 'name','email','image'],
                include : ['roles']
            })
            .then(users => {
                let usersRespuesta = {
                    meta: {
                        status: 200,
                        url: 'api/users/:id'
                    },
                    // data: {users} 
                    data : 
                    {
                        id : users.id,
                        name : users.name, 
                        email : users.email,
                        image : "/img/usersimage/" + users.image
                        
                    }
                }
                res.json(usersRespuesta);
            });
    }
    
   
}


module.exports = usersController;