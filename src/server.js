'use strict';

const express = require('express');
const app = express();
let bodyParser = require('body-parser');
let ejs = require('ejs');
let pg = require('pg');

let client = new pg.Client('postgres://postgres:blahblah@172.17.0.1:9000/postgres');

let votes = {
  sandwiches: 0,
  tacos: 0
};

client.connect(function (err) {
  if (err) throw err;
  client.query('SELECT number_of_votes FROM votes', function (err, result) {
    if (err) throw err;

    votes.sandwiches = result.rows[0].number_of_votes;
    votes.tacos = result.rows[1].number_of_votes;
  });
});

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
      client.query('UPDATE votes SET number_of_votes=\'' + votes.sandwiches + '\' WHERE option_name=\'sandwiches\'', function (err, result) {
        if (err) throw err;
      });
  } else if(vote === 'tacos') {
    votes.tacos = votes.tacos + 1;
      client.query('UPDATE votes SET number_of_votes=\'' + votes.tacos + '\' WHERE option_name=\'tacos\'', function (err, result) {
        if (err) throw err;
      });
  } else {
    console.log('Something went wrong: vote contains ' + vote);
  }
  res.redirect('/');
});

const PORT = 8888;
app.listen(PORT);
console.log('Running on http://localhost:' + PORT);