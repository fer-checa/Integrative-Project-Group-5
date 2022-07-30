const sequelize = require("sequelize");

module.exports = (sequelize, dataTypes) => {

  
    
    let alias = 'Users';
    
    let cols = {

        id: {

            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        name:{

            type: dataTypes.STRING
        },

        email: {

            type: dataTypes.STRING
        },

        password: {

            type: dataTypes.STRING
        },

        image: {

            type: dataTypes.STRING
        },
        role_id: {

            type: dataTypes.INTEGER
        },

    };

    let config = {
        
        tableName: 'users',
        timestamps: false
    }

    

    /* Aqui van las asociaciones */

 /*    User.associate = function (models) */ /* { */
        // Asociacion con la tabla de roles
       /*  User.hasMany(models.Role, {
            as: "roles",
            foreignKey: "role_id"
        }); */
        // Asociacion con la tabla de productos
       /*  User.belongsTo(models.Product, {
            as: "products",
            foreignKey: "role_id"
        }); */
        // Asociacion con la tabla de FamilyProduct
        /* User.belongsTo(models.FamilyProduct, {
            as: "FamilyProduct",
            foreignKey: "user_id"
        }); */

   /*  } */

   const User = sequelize.define( alias, cols, config);


    return User;
}