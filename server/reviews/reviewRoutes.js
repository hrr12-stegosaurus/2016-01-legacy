var reviewController = require('./reviewController.js');

module.exports = function (app){

	app.post('/', reviewController.addReviewToDB);

	app.post('/getReviews', reviewController.getReviewsFromDB);

};