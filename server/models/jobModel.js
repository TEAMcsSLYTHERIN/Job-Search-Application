'use strict';

module.exports = (sequelize, DataTypes) => {
  console.log('inside jobModel')
  const Job = sequelize.define('Job', {
    companyName: DataTypes.STRING,
    title: DataTypes.STRING,
    dateApplied: DataTypes.STRING,
    link: DataTypes.STRING,
    description: DataTypes.STRING,
    notes: DataTypes.STRING,
    status: DataTypes.STRING,  //OPTIONS:: applied, rejected, in process, TBD
    notification:  DataTypes.STRING  //OPTIONS:: 2 days, 7 days, 2 weeks
  });

  // Job.associate = function(models) {  // User should be passed in
  //   console.log('passed db to Job associate')
  //   models.Job.hasOne(models.User, {as:'user', constraints: 'false'});
  // };

  return Job;
};
