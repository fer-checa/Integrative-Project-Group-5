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
      type: dataTypes.STRING,
    },

    dateRelease: {
      type: dataTypes.STRING,
    },
    user_id: {
      type: dataTypes.INTEGER,
    },
  };

  let config = {
    tableName: "familyProducts",
    timestamps: false,
  };

  const FamilyProduct = sequelize.define("familyProduct", cols, config);

  /* Aqui va la asociacion */

  FamilyProduct.associate = function (models) {
    // Asociacion con la tabla de productos
    FamilyProduct.belongsTo(models.product, {
      as: "product",
      foreignKey: "familyProduct_id",
    });
    // Asociacion con la tabla de User
    FamilyProduct.hasMany(models.user, {
      as: "user",
      foreignKey: "user_id",
    });
  };

  return FamilyProduct;
};
