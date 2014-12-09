'use strict';

module.exports = function(arg) {

  var target;

  if (typeof arg === 'string') {

    target = {
      name : arg,
      email: arg
    };

  } else if (typeof arg === 'object' && ! Array.isArray(arg)) {

    target = arg;

    if ( ! target.email) throw new Error('dont have email field');

    target.name = target.name || target.email;

  } else {
    throw new TypeError();
  }

  return target;
};
