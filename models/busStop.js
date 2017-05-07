"use strict";

module.exports = function(sequelize, DataTypes) {
    var Model = sequelize.define("busStop", {
        name: DataTypes.STRING,
        latitude: DataTypes.DECIMAL(16, 13),
        longitude: DataTypes.DECIMAL(16, 13)
    }, {
        classMethods: {
            associate: function(models) {

            }
        }
    });

    return Model;
};
