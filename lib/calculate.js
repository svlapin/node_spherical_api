'use strict';

var sgeo = require('sgeo');

/**
 * POST /calculate
 */
exports.post = function(req, res) {
  var latReStr = '^(\\-?(?:\\d{1,2}\\s){2}(?:\\d{1,2}(?:\\.\\d+)?)\\s(?:S|N))';
  var lngReStr = '(\\-?(?:\\d{1,2}\\s){2}(?:\\d{1,2}(?:\\.\\d+)?)\\s(?:W|E))';

  var pointRe = new RegExp([latReStr, lngReStr].join(',\\s*'));

  var eParam = function(str) {
    return res.status(400).json({
      error: 'Invalid parameters' + (str ? ': ' + str : '')
    });
  };

  // validation
  if (!(req.body.startPoint && pointRe.test(req.body.startPoint))) {
    return eParam('startPoint');
  }

  if (!(req.body.dstPoint && pointRe.test(req.body.dstPoint))) {
    return eParam('dstPoint');
  }

  var speed = parseFloat(req.body.speed);

  if (!(speed &&
        typeof speed === 'number' &&
        speed > 0)) {
    return eParam('speed');
  }

  var parsePoint = function(str) {
    var match = str.match(pointRe);

    return new sgeo.latlon(
      sgeo.parseDMS(match[1]),
      sgeo.parseDMS(match[2])
    );
  };

  var startPoint = parsePoint(req.body.startPoint);
  var dstPoint = parsePoint(req.body.dstPoint);

  var distance = parseFloat(startPoint.distanceTo(dstPoint));

  res.json({
    distance: distance,
    travelTime: distance * 60 / speed,
    route: startPoint.interpolate(dstPoint, 5)
  });
};
