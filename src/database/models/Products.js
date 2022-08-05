
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

            type: dataTypes.BOOLEAN
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

    
    const Product = sequelize.define('Products', cols, config);
    
    /* Aqui van las asociaciones */

    Product.associate = function(models) {
        // Asociacion con la tabla de productos
        Product.belongsTo(models.Users, {
            as: "users",
            foreignKey: "user_id"
        });

        //Asociacion con la tabla de productos fami lyProducts
        Product.belongsTo(models.FamilyProducts, {
            as: "familyProducts",
            foreignKey: "familyProduct_id"
        });

        // Asociacion con la tabla de productos categoryAnimals
        Product.belongsTo(models.CategoryAnimals, {
            as: "categoryAnimals",
            foreignKey: "categoryAnimal_id"
        });
     }

    return Product;

     }

    
    /* return Product; */
