"use strict";

module.exports = function(sequelize, DataTypes) {
    var Model = sequelize.define("bus", {
        name: DataTypes.STRING,
        vehicleNo: DataTypes.STRING,
        gpsId: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {

            }
        }
    });

    return Model;
};
