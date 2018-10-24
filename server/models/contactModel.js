'use strict';

module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.INTEGER,
  });

  Contact.associate = function(models) { // Jobs model should be passed in
    models.Contact.hasOne(models.Job, {as: 'contact', constraints: false});
  };

  return Contact;
};
