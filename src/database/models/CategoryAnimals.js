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

            type: dataTypes.STRING
        },

        dateRelease: {

            type: dataTypes.STRING
        }

    };

    let config = {

        tableName: 'categoryAnimals',
        timestamps: false
    }

    const CategoryAnimal = sequelize.define( alias, cols, config);
    return CategoryAnimal;
}