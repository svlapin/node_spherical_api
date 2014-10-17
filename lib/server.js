'use strict';

var express = require('express');

var app = express();

app.all('*', function(req, res) {
  // 404 handler
  res.status(404).json({
    error: 'Not found'
  });
});

module.exports = app;
