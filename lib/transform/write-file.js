'use strict';

var fs = require('fs');

module.exports = function(filename) {

  return function(targets) {

    fs.readFileSync(filename);

    return targets;
  };

};
