var reviewController = require('./reviewController.js');

module.exports = function (app){

	app.post('/', reviewController.addReviewToDB);

	app.get('/', reviewController.getReviewsFromDB);

  // app.post('/reviews', reviewController.addReviewToDB);

  // app.get('/', reviewController.getReviewsFromDB);

};