'use strict';

module.exports = (sequelize, DataTypes) => {
  const Job = sequelize.define('Job', {
    companyName: DataTypes.STRING,
    title: DataTypes.STRING,
    dateApplied: DataTypes.STRING,
    link: DataTypes.STRING,
    description: DataTypes.STRING,
    notes: DataTypes.STRING,
    status: DataTypes.ENUM('Applied', 'Rejected', 'In Process', 'TBD'),
    notification:  DataTypes.ENUM('1 Day', '2 Days', '3 Days', '7 Days', '1 Week', '2 Weeks')  // Subject to change depending on Twilio integration
  });

  Job.associate = function(models) {
    models.Job.hasOne(models.User, {as:'user', constraints: false, allowNull: true, defaultValue: null});
  };

  return Job;
};
