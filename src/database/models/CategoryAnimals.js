const sequelize = require("sequelize");

module.exports = (sequelize, dataTypes) => {
    
    let alias = 'CategoryAnimals';
    
    let cols = {

        id: {

            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        name:{

            type: dataTypes.STRING
        },

        active: {
            // CONSULTAR - TIPO DE DATO? - BIT
            type: dataTypes.STRING
        },

        dateRelease: {
            // CONSULTAR - TIPO DE DATO? - DATETIME
            type: dataTypes.STRING
        }

    };

    let config = {

        tableName: 'categoryAnimals',
        timestamps: false
    }

    const CategoryAnimal = sequelize.define( alias, cols, config);

     /* Aqui va la asociacion */

     CategoryAnimal.associate = function (models) {
        // Asociacion con la tabla de productos
        CategoryAnimal.belongsTo(models.Product, {
            as: "products",
            foreignKey: "categoryAnimal_id"
        });
    }

    return CategoryAnimal;
}