"use strict";

module.exports = function(sequelize, DataTypes) {
    var Model = sequelize.define("routeBusStop", {
    	id:{
    		type: DataTypes.INTEGER,
    		primaryKey: true,
    		autoIncrement: true
    	}
    }, {
        classMethods: {
            associate: function(models) {
            }
        }
    });

    return Model;
};
