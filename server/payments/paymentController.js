var http = require('http-request');
var config = require('../config/config');

module.exports.sendToken = function(req, res){
  gateway.clientToken.generate({}, function (err, response) {
      res.send(response.clientToken);
    });
};

module.exports.receivePayMethod = function(req, res){
  var nonce = req.body.payment_method_nonce;
};