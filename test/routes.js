'use strict';

var request = require('supertest');
var assert = require('assert');

var app = require('../index');

describe('GET /unused_url', function() {
  it('response with 404', function(done) {
    request(app).get('/unused_url').expect(404, done);
  });
});

describe('POST /calculate', function() {
  it('response with 400 when parameters are not passed', function(done) {
    request(app)
      .post('/calculate')
      .send({})
      .expect(400, done);
  });

  it('response with 400 speed in not a number', function(done) {
    request(app)
      .post('/calculate')
      .send({
        startPoint: '51 30 30 N, 0 07 32 W',
        dstPoint: '41 8 44 N, 73 59 42 W',
        speed: '10'
      })
      .expect(400, done);
  });

  it('response with 400 speed is not positive', function(done) {
    request(app)
      .post('/calculate')
      .send({
        startPoint: '51 30 30 N, 0 07 32 W',
        dstPoint: '41 8 44 N, 73 59 42 W',
        speed: -1
      })
      .expect(400, done);
  });

  it('response with 200 when parameters are passed', function(done) {
    request(app)
      .post('/calculate')
      .send({
        startPoint: '51 30 30 N, 0 07 32 W',
        dstPoint: '41 8 44 N, 73 59 42 W',
        speed: 10
      })
      .expect(200, done);
  });

  it('return proper fields types', function(done) {
    request(app)
      .post('/calculate')
      .send({
        startPoint: '51 30 30 N, 0 07 32 W',
        dstPoint: '41 8 44 N, 73 59 42 W',
        speed: 300
      })
      .expect(200)
      .expect(function(res) {
          assert.equal(typeof res.body.distance, 'number');
          assert.equal(typeof res.body.travelTime, 'number');
          assert.equal(res.body.route instanceof Array, true);
      })
      .end(done);
  });

  it('return proper result', function(done) {
    request(app)
      .post('/calculate')
      .send({
        startPoint: '51 30 30 N, 0 07 32 W',
        dstPoint: '41 8 44 N, 73 59 42 W',
        speed: 300
      })
      .expect(200)
      .expect(function(res) {
          assert.equal(res.body.distance, 5540);
          assert.equal(res.body.travelTime, 1108);
      })
      .end(done);
  });
});
