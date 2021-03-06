"use strict";

module.exports = function(sequelize, DataTypes) {
    var Model = sequelize.define("bus", {
        name: DataTypes.STRING,
        vehicleNo: DataTypes.STRING,
        gpsId: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                Model.belongsTo(models.route)
                models.route.hasMany(Model)
            }
        }
    });

    return Model;
};
