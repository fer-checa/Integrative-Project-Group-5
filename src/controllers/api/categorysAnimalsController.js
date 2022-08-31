const db = require("../../database/models");
const sequelize = db.sequelize;
const moment = require("moment");
const path = require("path");
const { Op } = require("sequelize");
const { Sequelize } = require("../../database/models");

const categorysAnimalsController = {
  list: (req, res) => {
    db.CategoryAnimals.findAll({})
    .then((categorysAnimals) => {
      return res.json({
        meta: {
          status: 200,
          Count: categorysAnimals.length,

          url: "api/categorysAnimals",
        },
        data: categorysAnimals,
      });
    });
  },
};

module.exports = categorysAnimalsController;
