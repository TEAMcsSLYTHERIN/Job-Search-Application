const express = require('express');
const app = express();  // ?? This is basically us starting up the server
const port = 3000;
const path = require('path');

<<<<<<< HEAD
const db = require('./database/elephantsql.js')
=======
app.use(express.static('./dist'))
>>>>>>> bec0213de3a9ee4fdbb2b958978efd169b7a2f65

db.sequelize.sync().then(function() {
  // MAKING SURE DATABASE TABLES & MODELS GET ASSOCIATED BEFORE STARTING UP THE SERVER
  app.use(express.static('./static'))

  app.get('/', (req,res) => {
    res.sendFile('index.html')
  })

  app.listen(port, () => {
    console.log('listening on port: ' + port)
  })
});
