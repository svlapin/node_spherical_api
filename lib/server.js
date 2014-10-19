'use strict';

var path = require('path');
var express = require('express');
var bodyParser = require('body-parser').json();

var calculate = require('./calculate');

var app = express();

app.use(express.static(path.resolve('./public')));

app.post('/calculate', bodyParser, calculate.post)

app.all('*', function(req, res) {
  // 404 handler
  res.status(404).json({
    error: 'Not found'
  });
});

module.exports = app;
