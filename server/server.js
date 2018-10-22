const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

app.use(express.static('./static'))

app.get('/', (req,res) => {
  res.sendFile('index.html')
})

app.listen(port, () => {
  console.log('listening on port: ' + port)
})