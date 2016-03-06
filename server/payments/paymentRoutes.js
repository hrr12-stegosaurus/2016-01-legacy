var paymentController = require('./paymentController.js');



module.exports = function(app){
  app.get("/client_token", paymentController.sendToken);
  app.post("/checkout", paymentController.receivePayMethod);
};