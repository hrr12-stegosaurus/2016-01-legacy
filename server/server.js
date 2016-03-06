var express = require('express');
/*var braintree = require('braintree');*/

var app = express();
var port = process.env.PORT || 3000;

require('./config/middleware.js')(app,express);

app.listen(port, function () {
  console.log('Velociraptors server listening on port ' + port);
});

/*var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: 'cd4c7jn9wtpmgzhg',
  publicKey: 'w4bz7s8wkmm3x357',
  privateKey: '5714be889a0d4dd686ffd77abbe9d908'
});

app.get("/client_token", function (req, res) {
  gateway.clientToken.generate({}, function (err, response) {
    res.send(response.clientToken);
  });
});

app.post("/checkout", function (req, res) {
  var nonce = req.body.payment_method_nonce;
  console.log('=====NONCE======')
  console.log(nonce)
  // Use payment method nonce here
  //
  gateway.transaction.sale({
    amount: '10.00',
    paymentMethodNonce: nonce,
    options: {
      submitForSettlement: true
    }
  }, function (err, result) {
  });
});*/



module.exports = app;