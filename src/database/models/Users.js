const sequelize = require("sequelize");

module.exports = (sequelize, dataTypes) => {
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
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

    const User = sequelize.define('Users', cols, config);

    /* Aqui van las asociaciones */

    User.associate = function (models) {
        // Asociacion con la tabla de roles
        User.belongsTo(models.Roles, {
            as: "roles",
            foreignKey: 'role_id' //USER_ID
        });

        // Asociacion con la tabla de FamilyProduct
        User.hasMany(models.FamilyProducts, {
            as: "familyProducts",
            foreignKey: "user_id"
        });

        // Asociacion con la tabla de CategoryAnimal
        User.hasMany(models.CategoryAnimals, {
            as: "categoryAnimals",
            foreignKey: "user_id"
        });


        //Asociacion con la tabla de productos
        User.hasMany(models.Products, {
            as: "products",
            foreignKey: "user_id"
        });

    }

    return User;

}