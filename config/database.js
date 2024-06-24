const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("spreedsheet", "root", "root", {
  host: "localhost",
  dialect: "mysql"
});

module.exports = sequelize;
