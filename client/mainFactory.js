myApp.factory('Payment', function($http, $location){

  var getClientToken = function(){
    return $http({
      method: 'GET',
      url: '/client_token',
    })
    .then(function(token){
      return token.data;
    });
  };

  return {
    getClientToken: getClientToken
  };

});

myApp.factory('Calendar', function(){

  var displayTime = function(time) {
    var noSeconds = time.slice(0,5);
    var hours24 = parseInt(noSeconds.substring(0,2));
    var hours = ((hours24 + 11) % 12) + 1;
    var amPm = hours24 > 11 ? 'pm' : 'am';
    var minutes = noSeconds.substring(2);
    return hours + minutes + amPm;
  };

  return {
    displayTime: displayTime
  };

});


myApp.factory('Session', function($http, $location) {
  var createSession = function(session) {
    return $http({
      method: 'POST',
      url: '/sessions',
      data: session
    })
    .then(function(session) {
      return session.data;
    });
  };

  var deleteSession = function(session, callback) {
    return $http({
      method: 'DELETE',
      url: '/sessions',
      data: session,
      headers: {"Content-Type": "application/json;charset=utf-8"}
    })
    .then(function(session) {
      callback(session.data);
    })
  }

  var getSessions = function() {
    return $http({
      method: 'GET',
      url: '/sessions'
    })
    .then(function(sessions) {
      return sessions.data;
    });
  };

  var getRegistered = function(userId, callback) {
    return $http({
      method: 'POST',
      url: '/sessions/register',
      data: { id: userId }
    })
    .then(function(registered) {
      callback(registered.data);
    });
  };

  var getUserSessions = function(userId, callback) {
    return $http({
      method: 'POST',
      url: '/sessions/user',
      data: { userId: userId }
    })
    .then(function(sessions) {
      callback(sessions.data);
    });
  };

  var updateStatus = function(updateInfo){
    console.log('clicked inside factory', updateInfo);
    return $http({
      method: 'PUT',
      url: '/sessions',
      data: updateInfo
      })
    .then(function(updatedSession){
      return updatedSession;
    });
  };

  var register = function(userInfo) {
    return $http({
      method: 'POST',
      url: '/sessions/send',
      data: userInfo
    });
  };

  return {
    getRegistered: getRegistered,
    getUserSessions: getUserSessions,
    createSession: createSession,
    deleteSession: deleteSession,
    getSessions: getSessions,
    updateStatus: updateStatus,
    register: register
  };
});

myApp.factory('Auth', function ($http, $location, $window) {

  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/users/signIn',
      data: user
    })
    .then(function (user) {
      return user.data;
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/users',
      data: user
    })
    .then(function (user) {
      return user.data;
    });
  };

  var signout = function (user) {
    return $http({
      method: 'POST',
      url: '/users/signOut',
      data: user
    })
    .then(function (user) {
      return user.data;
    });
  };

  var isLoggedIn = function() {
    return $http({
      method: 'GET',
      url: '/users/isLoggedIn'
    })
    .then(function(bool) {
      loggedIn = true;
      console.log(loggedIn)
      return bool.data;
    });
  };

  var loggedIn = false;

  isLoggedIn().then(function(bool){
    loggedIn = bool;
  });

  var getLoggedIn = function(){
    return loggedIn;
  };

  var setLoggedIn = function(bool){
    loggedIn = bool;
  };

  var getSignedInUser = function () {
    // return $window.localStorage.getItem('user');
    return $http({
      method: 'GET',
      url: '/users/getSignedInUser'
    })
    .then(function(user) {
      return user;
    });
  };

  var getUser = function (userId, callback) {
    return $http({
      method: 'POST',
      url: '/users/getUser',
      data: {userId: userId}
    })
    .then(function(user) {
      callback(user);
    });
  }

  return {
    getUser: getUser,
    getSignedInUser : getSignedInUser,
    signin: signin,
    signup: signup,
    signout: signout,
    isLoggedIn: isLoggedIn,
    getLoggedIn: getLoggedIn,
    setLoggedIn: setLoggedIn
  };
});

myApp.factory('Review', function($http, $location) {

  var sendReviewToServer = function(review) {
    return $http({
      method: 'POST',
      url: '/reviews',
      data: review
    })
    .then(function(review) {
      return review;
    });
  };

  // Get all reviews from server, calculate average rating for each user.
  // Return averageRatings object.
  var getReviewsFromServer = function(userId, callback) {
    return $http({
      method: 'POST',
      url: '/reviews/getReviews',
      data: { userId: userId }
    })
    .then(function(query) {
      var reviews = query.data.reviews;
      var allRatings = {};
      var averageRatings = {};

      // Store an all of user's ratings in an array on the $allRatings object.
      // The user's userId is the key.
      for (var i = 0; i < reviews.length; i++) {
        var review = reviews[i];
        var userId = review.UserId;
        if (allRatings[userId] === undefined) {
          allRatings[userId] = [];
        }
        allRatings[userId].push(review.rating);
      }

      // Calculate the average of all the user's ratings. STore on $scope.averageRatings.
      // The user's userId is the key.
      for (var key in allRatings) {

        var userRatings = allRatings[key];
        var total = 0;
        var average;
        for (var i = 0; i < userRatings.length; i++) {
          var rating = userRatings[i];
          total += rating;
        }
        average = Math.floor(total / userRatings.length);
        averageRatings[key] = average;
        return averageRatings;
      }
    });
  };

  return {
    sendReviewToServer: sendReviewToServer,
    getReviewsFromServer: getReviewsFromServer
  };

});