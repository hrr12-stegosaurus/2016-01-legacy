var sessionController = require('./sessionController.js');

module.exports = function (app){

  app.get('/', sessionController.getSessions);
  
  app.post('/', sessionController.checkAuth, sessionController.addSession);

  app.post('/user', sessionController.getUserSessions);
  
  app.post('/send', sessionController.registerSession);
  
  app.put('/', sessionController.updateStatus);
  
  app.delete('/', sessionController.deleteSession);

  app.post('/register', sessionController.getRegistered);

};