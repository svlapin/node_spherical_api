'use strict';

exports.Point = Point;

/**
 * Point constructor
 * @param {Nubmer} r    radius
 * @param {Number} teta polar angle
 * @param {Number} phi  azimuth angle
 * @constructor
 */
function Point(r, teta, phi) {
  if (!(typeof r === 'number' &&
        typeof teta === 'number' &&
        typeof phi === 'number')) {
    throw new TypeError('Wrong arguments');
  }

  if (r < 0) {
    throw new TypeError('Radius should be non negative');
  }

  this.r = r;

  teta = Math.abs(teta);
  while (teta > Math.PI) {
    teta -= 2 * Math.PI;
  }

  this.teta = Math.abs(teta);

  while (phi >= 2 * Math.PI) {
    phi -= 2 * Math.PI;
  }

  while (phi < 0) {
    phi += 2 * Math.PI;
  }

  this.phi = phi;
}

/**
 * Translater point to Cartesian coordinates
 * @return {Array} array of coords [x, y, z]
 */
Point.prototype.toCartesian = function() {
  return [
    this.r * Math.sin(this.teta) * Math.cos(this.phi),
    this.r * Math.sin(this.teta) * Math.sin(this.phi),
    this.r * Math.cos(this.teta)
  ];
};
