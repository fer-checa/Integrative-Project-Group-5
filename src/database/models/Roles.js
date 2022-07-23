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
    return Role;
}