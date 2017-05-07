"use strict";

module.exports = function(sequelize, DataTypes) {
    var Model = sequelize.define("routeBusStop", {
    }, {
        classMethods: {
            associate: function(models) {
            }
        }
    });

    return Model;
};
