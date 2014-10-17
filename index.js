'use strict';

var server = require('./lib/server');
var utils = require('./lib/utils');

server.listen(process.env.PORT || 3000, function() {
  console.log('%s server is running on port %d', utils.getTime(),
    process.env.PORT || 3000);
});

module.exports = server;
