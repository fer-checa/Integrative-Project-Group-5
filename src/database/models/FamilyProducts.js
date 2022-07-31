const sequelize = require("sequelize");

module.exports = (sequelize, dataTypes) => {
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      type: dataTypes.STRING,
    },

    active: {
      type: dataTypes.BOOLEAN,
    },

    date_release: {
      type: dataTypes.STRING,
    },
    user_id: {
      type: dataTypes.INTEGER,
    },
  };

  let config = {
    tableName: "familyproducts",
    timestamps: false,
  };

 
  const FamilyProduct = sequelize.define("FamilyProducts", cols, config);

  /* Aqui va la asociacion */

  FamilyProduct.associate = function (models) {

    // Asociacion con la tabla de User
    FamilyProduct.belongsTo(models.Users, {
      as: "users",
      foreignKey: "user_id",
    });

     // Asociacion con la tabla de productos
    FamilyProduct.hasMany(models.Products, {
      as: "products",
      foreignKey: "familyProduct_id",
    });

  };

  return FamilyProduct;
}
