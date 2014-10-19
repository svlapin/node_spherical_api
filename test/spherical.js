'use strict';

var assert = require('assert');

var spherical = require('../lib/spherical');

describe('Point', function() {
  it('should fail when passing not numbers', function() {
    var invalidPoints = [
      {r: 10, teta: 10, phi: 'string'},
      {r: 10, teta: true, phi: 10},
      {r: -10, teta: 20, phi: 10}
    ];

    for (var i = 0, l = invalidPoints.length; i < l; i++) {
      var point = invalidPoints[i];
      assert.throws(
        function() {
          var p = new spherical.Point(point.r, point.teta, point.phi);
        },
        function(err) {
          if (err instanceof TypeError) {
            return true;
          }
        },
        "unexpected error"
      );
    }
  });

  it('should be created successfully for proper parametes', function() {
    var validPoints = [
      {r: 10, teta: 10, phi: 100500},
      {r: 10, teta: -120, phi: 100},
      {r: 1e6, teta: -120, phi: 100},
      {r: 0, teta: -120, phi: 100},
    ];

    for (var i = 0, l = validPoints.length; i < l; i++) {
      var point = validPoints[i];
      var p = new spherical.Point(point.r, point.teta, point.phi);
      assert.ok('r' in p);
      assert.ok('teta' in p);
      assert.ok('phi' in p);
    }
  });

  it('should have toCartesian method', function() {
    var point = new spherical.Point(10 , 0.5 * Math.PI, Math.PI);
    assert.ok(typeof point.toCartesian === 'function');
  });

  it('should convert to Cartesian properly', function() {
    var cart = new spherical.Point(10 , 0.5 * Math.PI, Math.PI)
      .toCartesian();

    assert.ok(equal(cart[0], -10));
    assert.ok(equal(cart[1], 0));
    assert.ok(equal(cart[2], 0));
  });

  it('should force teta to be 0 <= teta <= PI', function() {
    var point1 = new spherical.Point(10 , 11 * Math.PI, Math.PI);
    var point2 = new spherical.Point(10 , Math.PI, Math.PI);

    assert.ok(equal(point1.teta, point2.teta));
  });

  it('should force phi to be 0 <= PI <= 2 * PI', function() {
    var point1 = new spherical.Point(10 , 1234, 0);
    var point2 = new spherical.Point(11 , 12343, 6 * Math.PI);

    assert.ok(equal(point1.phi, point2.phi));
  });
});

function equal(a, b) {
  return Math.abs(a - b) < 1e-6;
}
