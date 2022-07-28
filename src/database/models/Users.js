const sequelize = require("sequelize");

module.exports = (sequelize, dataTypes) => {
    
   
    
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
        
        tableName: 'Users',
        timestamps: false
    }

    const User = sequelize.define('user', cols, config);

    /* Aqui van las asociaciones */

    User.associate = function (models) {
        // Asociacion con la tabla de roles

        //VER : ASOCIACIONES  ver linea 58. 
        //VER INCLUDE 
        User.hasMany(models.role, {
            as: "roles",
            foreignKey: "role_id" //USER_ID
        });


        // // Asociacion con la tabla de productos
        // User.belongsTo(models.product, {
        //     as: "userProduct",
        //     foreignKey: "role_id"
        // });

        // // Asociacion con la tabla de FamilyProduct
        // User.belongsTo(models.familyProduct, {
        //     as: "familyProduct",
        //     foreignKey: "user_id"
        // });
        // // Asociacion con la tabla de CategoryAnimal
        // User.belongsTo(models.categoryAnimal, {
        //     as: "categoryAnimal",
        //     foreignKey: "user_id"
        // });
    }
    return User;
}