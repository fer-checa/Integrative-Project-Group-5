const sequelize = require("sequelize");

module.exports = (sequelize, dataTypes) => {
    
    let alias = 'Roles';
    
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
        
        tableName: 'roles',
        timestamps: false
    }

    const Role = sequelize.define( alias, cols, config);

    /* Aqui va la asociacion */

    Role.associate = function (models) {
        Role.belongsTo(models.User, {
            as: "roles",
            foreignKey: "role_id"
        })
    }

    return Role;
}