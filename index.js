'use strict';

var defaultMatcher = require('./lib/matcher');
var defaultMailer  = require('./lib/mailer');



function MailMatcher(opts) {
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


MailMatcher.prototype.match = function(list, cb) {

  if ( ! Array.isArray(list)) {
    throw new TypeError();
  }

  var mailList = this.matcher(list);

  this.mailer(mailList, cb);
};

module.export = MailMatcher;
