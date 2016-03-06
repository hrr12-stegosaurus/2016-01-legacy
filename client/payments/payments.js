
myApp.controller('PaymentsController', function($scope, Payment, $http){


  Payment.getClientToken()
    .then(function(token){
      var clientToken = token;
      braintree.setup(clientToken, "dropin", {
        container: "payment-form"
      });
    })

});


