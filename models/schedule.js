"use strict";

module.exports = function(sequelize, DataTypes) {
    var Model = sequelize.define("schedule", {
    	time: DataTypes.DATE
    }, {
        classMethods: {
            associate: function(models) {
            	Model.belongsTo(models.bus)
            	models.bus.hasMany(Model)
            	Model.belongsTo(models.route)
            	models.route.hasMany(Model)
            	Model.belongsTo(models.busStop)
            	models.busStop.hasMany(Model)
            }
        }
    });

    return Model;
};
