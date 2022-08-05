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
        
        tableName: 'roles',
        timestamps: false
    }

   
    const Role = sequelize.define('Roles', cols, config);
    /* Aqui va la asociacion */

    Role.associate = function (models) {
        Role.hasMany(models.Users, {
            as: "users",
            foreignKey: 'role_id' //USER_ID
            
        })
    }

    return Role;
}