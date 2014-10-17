'use strict';

var request = require('supertest');

var app = require('../index');

describe('GET /somestrangeurl', function() {
  it('response with 404', function(done) {
    request(app).get('/').expect(404, done);
  });
});
