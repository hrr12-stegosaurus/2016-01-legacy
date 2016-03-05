var Review = require('../../db/models').Review;
var Mailgun = require('mailgun-js');
var config = require('../config/config');
var http = require('http-request');

module.exports.addReviewToDB = function(req, res) {

	Review.create({ 
		rating: req.body.rating 
	})
	.then(function(review) {
		res.send({ rating: review.rating });
	})
	.catch(function(err) {
		console.error('Error creating user: ', err.message);
		res.end();
	});

};