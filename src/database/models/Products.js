const sequelize = require("sequelize");

module.exports = (sequelize, dataTypes) => {
    
    let alias = 'Products';
    
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

            type: dataTypes.DATA
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
        
        tableName: 'products',
        timestamps: false

    }

    const Product = sequelize.define( alias, cols, config);

    /* Aqui van las asociaciones */

    Product.associate = function(models) {
        // Asociacion con la tabla de productos
        Product.hasMany(models.User, {
            as: "user",
            foreignKey: "user_id"
        });
        // Asociacion con la tabla de productos familyProducts
        Product.hasMany(models.FamilyProduct, {
            as: "familyProduct",
            foreignKey: "familyProduct_id"
        });
        // Asociacion con la tabla de productos categoryAnimals
        Product.hasMany(models.CategoryAnimal, {
            as: "categoryAnimal",
            foreignKey: "categoryAnimal_id"
        });


    }

    return Product;
}