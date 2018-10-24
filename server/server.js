require('dotenv').config();  //Making environmental variables accessible

const express = require('express');
const app = express();
const port = 3000;

const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');


const db = require('./database/elephantsql.js')

db.sequelize.sync().then(function() {
  //MAKING SURE DATABASE TABLES & MODELS GET ASSOCIATED BEFORE STARTING UP THE SERVER
  app.use(express.static('./dist'))
  app.use(express.static('./static'))

  app.get('/', (req,res) => {
    res.sendFile('index.html')
  })

// <<<<<<< HEAD
  app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
  }))
// =======
// app.get('/', (req, res) => {
//   res.sendFile('index.html')
// })
// >>>>>>> semantic-ui

  app.listen(port, () => {
    console.log('listening on port: ' + port)
  })
});
