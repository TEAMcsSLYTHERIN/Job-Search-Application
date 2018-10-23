const express = require('express');
const app = express();  // ?? This is basically us starting up the server
const port = 3000;
const path = require('path');

const db = require('./database/elephantsql.js')

db.sequelize.sync().then(function() {
  // MAKING SURE DATABASE TABLES & MODELS GET ASSOCIATED BEFORE STARTING UP THE SERVER
  app.use(express.static('./dist'))
  app.use(express.static('./static'))

  app.get('/', (req,res) => {
    res.sendFile('index.html')
  })

  app.listen(port, () => {
    console.log('listening on port: ' + port)
  })
});
