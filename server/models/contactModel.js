'use strict';

module.exports = (sequelize, DataTypes) => {
  console.log('inside contactModel')
  const Contact = sequelize.define('Contact', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.INTEGER,
  });

  Contact.associate = function(models) { // Jobs model should be passed in
    console.log('passed db to Contact associate')
    models.Contact.hasOne(models.Job, {as: 'contact', constraints: 'false'});
  };

  return Contact;
};
