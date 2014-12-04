'use strict';

var isEmail = require('isemail');
var transform = require('./lib/transform');
var defaultMatcher = require('./lib/matcher');
var defaultMailer  = require('./lib/mailer');



function MailMatcher(opts) {
  if ( ! (this instanceof MailMatcher)) return new MailMatcher(opts);

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

  var length = targets.length
    , list = []
    ;

  for (var i = 0; i < length; i++) {

    targets[i] = transform(targets[i]);
  }

  for (var j = 0; j < length; j++) {

    if (isEmail(targets[j].email)) {
      list.push(targets[j].email);
    }
  }

  var mailList = this.matcher(list);

  this.mailer(mailList, cb);
};

module.export = MailMatcher;
