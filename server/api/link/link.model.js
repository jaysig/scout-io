'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Link', {
     _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.CHAR(255),
    url: {
      type: DataTypes.CHAR(255),
      validate: {
        notEmpty: true
      }
    },//Unique?
    apiID: DataTypes.BIGINT,
    apiName: DataTypes.CHAR(45),
    publicComments: DataTypes.STRING(8000),
    active: DataTypes.BOOLEAN()
  });
};
