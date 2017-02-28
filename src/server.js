'use strict';

const express = require('express');
const app = express();
let bodyParser = require('body-parser');
let ejs = require('ejs');
let pg = require('pg');

let client = new pg.Client('postgres://postgres:blahblah@localhost:9000');
client.connect(function (err) {
  if (err) throw err;
  // client.query('CREATE TABLE IF NOT EXISTS votes (string string timestamptz)', function(err, result) {
  //   if(err) throw err;
  //   console.log(result);
  // });
  // client.query('DELETE FROM votes', function(err, result) {
  //   if (err) throw err;
  //   console.log(result);
  // });
  // client.query('INSERT INTO votes (string string) VALUES ($1)', "")
  client.query('SELECT number_of_votes FROM votes WHERE option_name="$1"', ['sandwiches'], function (err, result) {
    if (err) throw err;
    console.log(result.rows[0]); // outputs: { name: 'brianc' } 
    client.end(function (err) {
      if (err) throw err;
    });
  });
});

let votes = {
  sandwiches: 0,
  tacos: 0
};

let urlencodedParser = bodyParser.urlencoded({ extended: false })

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')

app.get('/', function (req, res) {
  res.render('pages/index', {
    votes: votes
  });
});

app.post('/vote', urlencodedParser, function(req, res) {
  let vote = req.body.yourVote;
  if(vote === 'sandwiches') {
    votes.sandwiches = votes.sandwiches + 1;
  } else if(vote === 'tacos') {
    votes.tacos = votes.tacos + 1;
  } else {
    console.log('Something went wrong: vote contains ' + vote);
  }
  res.redirect('/');
});

const PORT = 8888;
app.listen(PORT);
console.log('Running on http://localhost:' + PORT);