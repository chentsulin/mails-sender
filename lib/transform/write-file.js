'use strict';

var fs = require('fs');

module.exports = function(filename) {

  return function(targets) {

    fs.writeFileSync(filename);

    return targets;
  };

};
