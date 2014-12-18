'use strict';

var _ = require('lodash');

module.exports = function(targets) {

  var clones = _.cloneDeep(targets)
    , l = clones.length
    , isMatchSelf
    , shuffle
    ;


  do {
    isMatchSelf = false;

    shuffle = _.shuffle(clones);

    for (var i = 0; i < l && ! isMatchSelf; i++) {
      if (clones[i].email === shuffle[i].email) {
        isMatchSelf = true;
      }
    }

  } while (isMatchSelf);

  for (var i = 0; i < l; i++) {
    clones[i].targetName = shuffle[i].name;
  }

  return clones;
};
