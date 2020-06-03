"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var basename = path.basename(__filename);
var env = process.env.NODE_ENV || "development";
var dbconfig = require(__dirname + "/../config/dbconfig.json")[env];
var db = {};

if (dbconfig.use_env_variable) {
  var sequelize = new Sequelize(process.env[dbconfig.use_env_variable], dbconfig);
} else {
  var sequelize = new Sequelize(dbconfig.database, dbconfig.username, dbconfig.password, dbconfig);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf(".") !== 0) && (file !== basename) && (file.slice(-3) === ".js");
  })
  .forEach(file => {
    var model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;