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
      // CONSULTAR - TIPO DE DATO? - BIT
      type: dataTypes.STRING,
    },

    dateRelease: {
      // CONSULTAR - TIPO DE DATO? - DATETIME
      type: dataTypes.STRING,
    },
  };

  let config = {
    tableName: "CategoryAnimals",
    timestamps: false,
  };

  const CategoryAnimal = sequelize.define("categoryAnimal", cols, config);

  /* Aqui va la asociacion */

  // CategoryAnimal.associate = function (models) {
  //   // Asociacion con la tabla de productos
  //   CategoryAnimal.belongsTo(models.product, {
  //     as: "product",
  //     foreignKey: "categoryAnimal_id",
  //   });
  //   // Asociacion con la tabla de User
  //   CategoryAnimal.hasMany(models.user, {
  //       as: "user",
  //       foreignKey: "user_id",
  //     });
  // };

  return CategoryAnimal;
};
