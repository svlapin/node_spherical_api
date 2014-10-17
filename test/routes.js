'use strict';

var request = require('supertest');

var app = require('../index');

describe('GET /unused_url', function() {
  it('response with 404', function(done) {
    request(app).get('/unused_url').expect(404, done);
  });
});
