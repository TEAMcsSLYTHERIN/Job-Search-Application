'use strict';

module.exports = (sequelize, DataTypes) => {
  console.log('inside userModel')
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.INTEGER,
  });

  User.associate = function(models) { // Jobs model should be passed in
    console.log('passed db to User associate')
    models.User.hasMany(models.Job, {as: 'job', constraints: 'false'});
  };

  return User;
};