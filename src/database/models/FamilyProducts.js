const sequelize = require("sequelize");

module.exports = (sequelize, dataTypes) => {
    
    let alias = 'FamilyProduct';
    
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
        
        tableName: 'familyProducts',
        timestamps: false
    }

    const FamilyProduct = sequelize.define( alias, cols, config);
    return FamilyProduct;
}