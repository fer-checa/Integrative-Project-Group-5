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

        description: {

            type: dataTypes.STRING
        },

        image: {

            type: dataTypes.STRING
        },

        price: {

            type: dataTypes.STRING
        },

        discount: {

            type: dataTypes.STRING
        },

        date_release: {

            type: dataTypes.DATE
        },

        active: {

            type: dataTypes.STRING
        },
        user_id: {

            type: dataTypes.INTEGER
        },

        familyProduct_id: {

            type: dataTypes.INTEGER
        },

        categoryAnimal_id: {

            type: dataTypes.INTEGER
        },
    };

    let config = {
        
        tableName: 'Products',
        timestamps: false

    }

    const Product = sequelize.define('product', cols, config);

    /* Aqui van las asociaciones */

    Product.associate = function(models) {
        // Asociacion con la tabla de productos
        Product.hasMany(models.user, {
            as: "user",
            foreignKey: "user_id"
        });

        // Asociacion con la tabla de productos familyProducts
        Product.hasMany(models.familyProduct, {
            as: "familyProduct",
            foreignKey: "familyProduct_id"
        });
        // Asociacion con la tabla de productos categoryAnimals
        Product.hasMany(models.categoryAnimal, {
            as: "categoryAnimal",
            foreignKey: "categoryAnimal_id"
        });


     }

    return Product;
}