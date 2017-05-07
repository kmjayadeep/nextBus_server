"use strict";

module.exports = function(sequelize, DataTypes) {
    var Model = sequelize.define("route", {
        name: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                Model.belongsToMany(models.busStop,{
                    through: models.routeBusStop
                })
                models.busStop.belongsToMany(Model,{
                    through: models.routeBusStop
                })
            }
        }
    });

    return Model;
};
