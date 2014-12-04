'use strict';

var _ = require('lodash');


module.export = function(targets) {

  var clones = _.cloneDeep(targets);

  var remainings = _.cloneDeep(targets);

  while (remainings.length) {

    var order = Math.floor(Math.random() * remainings.length);

    if (remainings[order].email !== clones[remainings.length - 1].email) {

      clones[remainings.length - 1].to = remainings[order].email;

      remainings.splice(order, 1);
    }
  }

  return clones;
};
