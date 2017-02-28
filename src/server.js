'use strict';

const express = require('express');
let bodyParser = require('body-parser');
let ejs = require('ejs');

let votes = {
  sandwiches: 0,
  tacos: 0
};

let urlencodedParser = bodyParser.urlencoded({ extended: false })

const app = express();
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')


app.get('/', function (req, res) {
  res.render('pages/index', {
    votes: votes
  });
});

app.post('/vote', urlencodedParser, function(req, res) {
  let vote = req.body.yourVote;
  console.log('vote is: ' + vote);
  if(vote == 'sandwiches') {
    votes.sandwiches = votes.sandwiches + 1;
  } else if(vote == 'tacos') {
    votes.tacos = votes.tacos + 1;
  } else {
    res.send('Something went wrong: vote contains ' + vote);
  }
  console.log(votes.sandwiches + ' ' + votes.tacos);
  res.redirect('/');
});

const PORT = 8888;
app.listen(PORT);
console.log('Running on http://localhost:' + PORT);