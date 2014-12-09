'use strict';

var isEmail = require('isemail');
var format = require('./lib/format');
var defaultMatcher = require('./lib/matcher');
var defaultMailer  = require('./lib/mailer');


function MailMatcher(opts) {
  if ( ! (this instanceof MailMatcher)) return new MailMatcher(opts);

  opts = opts || {};

  this.matcher = opts.matcher || defaultMatcher;
  this.mailer  = opts.mailer  || defaultMailer;
}

MailMatcher.prototype.setMatcher = function(matcher) {
  if (matcher) {
    this.matcher = matcher;
  }
};

MailMatcher.prototype.setMailer = function(mailer) {
  if (mailer) {
    this.mailer = mailer;
  }
};


MailMatcher.prototype.match = function(targets, cb) {

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

  var mailList = this.matcher(list);

  this.mailer(mailList, cb);
};

module.exports = MailMatcher;
