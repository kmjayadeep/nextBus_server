"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var config = require('../config')()
var sequelize = new Sequelize(config.mysql.database, config.mysql.username, config.mysql.password);

var db = {};

fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
        var model = sequelize.import(path.join(__dirname, file));
        db[file.split('.')[0]] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
