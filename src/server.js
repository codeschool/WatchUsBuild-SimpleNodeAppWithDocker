'use strict';

const express = require('express');
let votes = {
  sandwiches: 0,
  tacos: 0
};

const app = express();
app.get('/', function (req, res) {
  res.send('Current vote count\nSandwiches: ' + votes.sandwiches + '\nTacos: ' + votes.tacos + '\n');
});

const PORT = 8888;
app.listen(PORT);
console.log('Running on http://localhost:' + PORT);