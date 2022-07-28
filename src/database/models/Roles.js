const sequelize = require("sequelize");

module.exports = (sequelize, dataTypes) => {
    
   
    let cols = {

        id: {

            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        role: {

            type: dataTypes.STRING
        }

    };

    let config = {
        
        tableName: 'Roles',
        timestamps: false
    }

    const Role = sequelize.define('role', cols, config);

    /* Aqui va la asociacion */

    Role.associate = function (models) {
        Role.belongsTo(models.user, {
            as: "user",
            foreignKey: "id"
        })
    }

    return Role;
}