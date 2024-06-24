const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import the Record model
db.GridCharacter = require("./GridCharacter")(sequelize, Sequelize);

module.exports = db;
