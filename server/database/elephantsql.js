'use strict';

const fs = require('fs');
const path = require('path');
const pg = require('pg');
const Sequelize = require('sequelize');
const modelsFolder = path.join(__dirname, '../models')
const conString = "postgres://drypdfhs:DOY4nIJI5Xg33wWkkUKu9fK7UYQS53Zf@elmer.db.elephantsql.com:5432/drypdfhs"
const sequelize = new Sequelize(conString)  // CREATING THE CONNECTION

let db = {};


sequelize  // TESTING THE CONNECTION
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

fs  //Reads model folder directory & automatically adds every model in the folder
  .readdirSync(modelsFolder)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(modelsFolder, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {  
      db[modelName].associate(db);
    }
  });

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db;


/* 
SOURCES:
https://sequelize.readthedocs.io/en/1.7.0/articles/express/
https://scotch.io/tutorials/getting-started-with-node-express-and-postgres-using-sequelize
*/