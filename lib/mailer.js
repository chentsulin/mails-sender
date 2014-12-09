'use strict';

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: '',
      pass: ''
    }
});

module.exports = function(targets) {

  targets.forEach(function(t) {
    var opts = {
      from: '',
      to: t.email,
      subject: '',
      html: ''
    };

    var handleResult = function(err, info) {
      if (err) {
          console.log(err);
          setTimeout(function() {
            transporter.sendMail(opts, handleResult);
          }, 500);
      } else {
          console.log('Message sent: ' + info.response);
      }
    };

    transporter.sendMail(opts, handleResult);
  });
};
