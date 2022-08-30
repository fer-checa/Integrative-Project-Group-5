const db = require("../../database/models");
const sequelize = db.sequelize;
const moment = require("moment");
const path = require("path");
const { Op } = require("sequelize");
const { Sequelize } = require("../../database/models");
const usersController = {
 
  list: (req, res) => {
    db.Users.findAll({
      //attributes: ["id", "name", "email"],
      // include: ['roles']
    }).then((usersAux) => {
      var users = [];
      for (let index = 0; index < usersAux.length; index++) {
        users.push({
             id: usersAux[index].id,
             name : usersAux[index].name,
             email: usersAux[index].email,
             detalle : "/api/users/" + usersAux[index].id
        });
      }
      

      return res.json({
        meta: {
          status: 200,
          Count: users.length,
          url: "api/users",
        },
        data: { users },
      });
    });
  },

  detail: (req, res) => {
    db.Users.findByPk(req.params.id, {
      //attributes: ['id', 'name','email','image'],
      include: ["roles"],
    }).then((user) => {
      let userAux = {
        meta: {
          status: 200,
          url: "api/users/:id",
        },
        // data: {user}
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          image: "/img/usersimage/" + user.image,
        },
      };
      res.json(userAux);
    });
  },
};

module.exports = usersController;
