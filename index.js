'use strict';

var _ = require('lodash');
var isEmail = require('isemail');
var format = require('./lib/format');
var defaultMailer  = require('./lib/mailer');



function MailsSender(opts) {
  if ( ! (this instanceof MailsSender)) return new MailsSender(opts);

  opts = opts || {};

  this.transforms = opts.transforms || [];
  this.mailer  = opts.mailer || defaultMailer;
}

MailsSender.prototype.setTransform = function(transform) {
  if (transform && typeof transform === 'function') {
    this.transforms.push(transform);
  } else {
    throw new TypeError('transform should be a function');
  }
  return this;
};

MailsSender.prototype.setMailer = function(mailer) {
  if (mailer) {
    this.mailer = mailer;
  }
  return this;
};


MailsSender.prototype.send = function(targets, cb) {

  if ( ! Array.isArray(targets)) {
    throw new TypeError();
  }

  var list = [];

  targets = targets.map(function(t) {
    return format(t);
  });

  targets.forEach(function(t) {
    if (isEmail(t.email)) {
      list.push(t);
    }
  });

  var mails = _.cloneDeep(targets);

  this.transforms.forEach(function(t) {
    mails = t(mails);
  });

  this.mailer(mails, cb);
};

module.exports = MailsSender;
