var userController = require('./userController');
var passport = require('passport');

module.exports = function (app){
	
	app.get('/', userController.getUsers);

	app.get('/isLoggedIn', userController.isLoggedIn);
	
	app.get('/getSignedInUser', userController.getSignedInUser);
	
	app.post('/', userController.newUser);
	
	app.post('/signIn', passport.authenticate('local', { session: true }), userController.signIn);

	app.post('/signOut', userController.signOut);

	app.post('/getUser', userController.getUser);

	app.delete('/deleteUser', userController.deleteUser);

};