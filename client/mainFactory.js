
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
      console.log('=====SESSIONS=====')
      console.log(sessions);
      return sessions.data;
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
    getUserSessions: getUserSessions,
    createSession: createSession,
    deleteSession: deleteSession,
    getSessions: getSessions,
    updateStatus: updateStatus,
    register: register,
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

  var getReviewsFromServer = function(userId, callback) {
    return $http({
      method: 'POST',
      url: '/reviews/getReviews',
      data: { userId: userId }
    })
    .then(function(query) {
      var reviews = query.data.reviews;
      callback(query);
    });
  };

  return {
    sendReviewToServer: sendReviewToServer,
    getReviewsFromServer: getReviewsFromServer
  };

});