var pg = require('pg');
//or native libpq bindings
//var pg = require('pg').native

var conString = "postgres://drypdfhs:DOY4nIJI5Xg33wWkkUKu9fK7UYQS53Zf@elmer.db.elephantsql.com:5432/drypdfhs" //URL is ElephantQL connection
var client = new pg.Client(conString);


client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }

  client.query('SELECT NOW() AS "theTime"', function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }

    console.log(result.rows[0].theTime);
    // >> output: 2018-08-23T14:02:57.117Z
    client.end();
  });
});