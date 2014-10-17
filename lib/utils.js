'use strict';

var moment = require('moment');

exports.getTime = getTime;

/**
 * Get current time in format YYYY-MM-DD HH:MM
 * @return {[type]} [description]
 */
function getTime() {
  return moment().format('YYYY-MM-DD HH:mm:ss:SS');
}
