const express = require('express');
const app = express();
const port = 3000;

const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');


app.use(express.static('./static'))

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

app.get('/', (req,res) => {
  res.sendFile('index.html');
})

app.listen(port, () => {
  console.log('listening on port: ' + port);
})