'use strict';

module.exports = (sequelize, DataTypes) => {
  const Application = sequelize.define('Application', {
    companyName: DataTypes.STRING,
    title: DataTypes.STRING,
    dateApplied: DataTypes.STRING,
    link: DataTypes.STRING,
    description: DataTypes.STRING,
    notes: DataTypes.STRING,
    status: DataTypes.ENUM('Resume Submitted', 'Coding Challenges', 'Recruiter Phone Screens', 'Technical Phone Screens', 'On-site Interviews'),
    notification:  DataTypes.ENUM('1 Day', '2 Days', '3 Days', '7 Days', '1 Week', '2 Weeks')
  });

  Application.associate = function(models) {
    models.Application.hasOne(models.User, {as:'user', constraints: false, allowNull: true, defaultValue: null});
  };

  return Application;
};