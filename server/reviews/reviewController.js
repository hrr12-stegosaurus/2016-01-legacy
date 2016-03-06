var Review = require('../../db/models').Review;
var config = require('../config/config');
var http = require('http-request');

module.exports.addReviewToDB = function(req, res) {

	Review.create({
		rating: req.body.rating,
		UserId: req.body.userId
	})
	.then(function(review) {
		res.send({ rating: review.rating, userId: review.userId });
	})
	.catch(function(err) {
		console.error('Error creating user: ', err.message);
		res.end();
	});

};

module.exports.getReviewsFromDB = function(req, res) {

	var userId = req.body.userId;
	console.log('REQ: ', req)
	console.log('Server-side req.body: ', req.body)

	Review.findAll({
		// where: {
		// 	UserId: userId
		// }
	})
	.then(function(reviews) {
		if (!reviews) {
			console.log('No reviews found.');
			res.end();
		} else {
			res.send({reviews: reviews})
		}
	})
	.catch(function(err) {
		console.error('Error getting reviews: ', err);
	});

};