var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('./localAuth.js');
var User = require('../../db/models').User;
var fbAuth = require('./fbauth')
var LocalStrategy2 = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function (app, express) {

  var userRouter = express.Router();
  var sessionRouter = express.Router();
  var reviewRouter = express.Router();

  app.use(bodyParser.urlencoded({ extend: true }));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(session({ secret: 'tinymonster123'}));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.static(__dirname + '/../../client'));
  
  passport.use(LocalStrategy);
  
  // stores userId on every new request
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  
  // finds user signed in based on userId
  passport.deserializeUser(function (id, done) {
    User.findById(id)
    .then(function (user) {
      return done(null, user);
    })
    .catch(function (err) {
      return done(err);
    });
  });

  //facebook login 
  app.get('/auth/facebook',
    passport.authenticate('facebook', {scope: ['email']}));

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/signIn' }),
      function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/#/');
  });

  //facebook login
  passport.use(new FacebookStrategy({
      clientID: fbAuth.facebookAuth.clientID,
      clientSecret: fbAuth.facebookAuth.clientSecret,
      callbackURL: fbAuth.facebookAuth.callbackURL,
      profileFields: ['id', 'displayName', 'photos', 'email']
    },
    function(accessToken, refreshToken, profile, done) {
      process.nextTick(function(){
        User.findOne({ where: { email: profile.emails[0].value } })
          .then(function (user) {
            if (!user) {
              User.create({
                username: profile._json.name,
                email: profile.emails[0].value,
                password: profile._json.name
              })
              .then(function (user){
                return {username: user.username, email: user.email}
              }).catch(function(err){
                console.log('Error creating user: ', err.message);
                return
              })
            } else if(user) {
              return done(null, user);
            }
          })
          .catch(function(err) {
            return done(err);
          });
      })
    }
  ));

  app.use('/users', userRouter);
  app.use('/sessions', sessionRouter);
  app.use('/reviews', reviewRouter);

  require('../users/userRoutes.js')(userRouter);
  require('../sessions/sessionRoutes.js')(sessionRouter);
  require('../reviews/reviewRoutes.js')(reviewRouter);
};