var Review = require('../../db/models').Review;
var Mailgun = require('mailgun-js');
var config = require('../config/config');
var http = require('http-request');

module.exports.addReviewToDB = function(req, res) {

	console.log('req.body: ', req.body)

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