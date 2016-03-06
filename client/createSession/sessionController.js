
myApp.controller('SessionController', function ($scope, Session, Auth, Review) {
 
  $scope.sessions = [];

  $scope.getSessions = function () {
    Session.getSessions()
    .then(function (sessions) {
      $scope.sessions = sessions;
    });
  };

  $scope.getSessions();
  $scope.isClicked = false;

  $scope.register = function (session, tuteeEmail){

    // send an email to user and register them
    var registerInfo = {tuteeEmail: tuteeEmail, link: session.link, topic: session.topic, tutorEmail: session.User.email};

    Session.register(registerInfo);

    // when someone registers for a session, status of session changes to true
    var updateInfo = {id: session.id, status: true };
    Session.updateStatus(updateInfo).then(function(updatedSession){
      $scope.getSessions();
    });
  };

  $scope.delete = function (session) {
    Auth.getSignedInUser().then(function (user){
      if(session.User.id === user.data.UserId) {
        Session.deleteSession(session, function(data) {
          $scope.sessions = data;
        });
      }
    })
  };
//******************************************************************************************

  $scope.review = { rating: null };
  $scope.allReviews = { /*[userId]: [all ratings]*/ };
  $scope.averageRating = {};

  $scope.submitReview = function (userId) {
    var rating = $scope.review.rating;
    Review.sendReviewToServer({rating, userId});
    // console.log(Review.getReviewsFromServer(1));
    $scope.getTotalRating(userId);
  };

  // $scope.getTotalRating = function (userId) {
  //   Review.getReviewsFromServer(userId, function(reviews) {
  //     console.log('reviews: ', reviews)
  //     $scope.allReviews[userId] = reviews.data.reviews;
  //     console.log('$scope.allReviews[userId]: ', $scope.allReviews[userId]);
  //     var total = 0;
  //     var length = $scope.allReviews[userId].length;
  //     var averageRating;
  //     $scope.allReviews[userId].forEach(function(review) {
  //       var rating = review.rating;
  //       total += rating;
  //     });
  //     averageRating = Math.floor(total / length);
  //     $scope.averageRating[userId] = averageRating;
  //   });
  // };

  $scope.getTotalRating = function (userId) {
    Review.getReviewsFromServer(userId, function(reviews) {

      var reviews = reviews.data.reviews;

      for (var i = 0; i < reviews.length; i++) {
        var review = reviews[i];
        console.log('review: ', review)
        var userId = review.UserId;
        if ($scope.allReviews[userId] === undefined) {
          $scope.allReviews[userId] = [];
        }
        $scope.allReviews[userId].push(review.rating);
      }

      for (var key in $scope.allReviews) {
        console.log('$scope.allReviews[key]', $scope.allReviews[key])
        var userRatings = $scope.allReviews[key];
        var total = 0;
        var average;
        for (var i = 0; i < userRatings.length; i++) {
          var rating = userRatings[i];
          total += rating;
        }
        average = Math.floor(total / userRatings.length);
        console.log('average: ', average);
        $scope.averageRating[key] = average;
      }

      // reviews.forEach(function(review) {
      //   console.log('review: ', review);
      //   var userId = review.userId;
      //   $scope.allReviews[userId].push(review.rating);
      // });
      console.log('$scope.allReviews: ', $scope.allReviews);
    });
  };

  $scope.getTotalRating();

//****************************************************************************************  
  //logic for filtering sessions by all vs. today
  $scope.filterType = 'all';
  $scope.sessionFilter = function (session) {
    if (session.startTime) {
      var today = new Date();
      var sessionTime = new Date(session.startTime.substring(0,19));
      if ( $scope.filterType === 'all') {
        return true;
      } else if ($scope.filterType === 'day') {
        return sessionTime.getDay() === today.getDay() && sessionTime.getMonth() === today.getMonth() && sessionTime.getFullYear() === today.getFullYear();
      }
    } else {
      return true;
    }
  };
  //format time for display on session card
  $scope.displayTime = function(time) {
    var noSeconds = time.slice(0,5);
    var hours24 = parseInt(noSeconds.substring(0,2));
    var hours = ((hours24 + 11) % 12) + 1;
    var amPm = hours24 > 11 ? 'pm' : 'am';
    var minutes = noSeconds.substring(2);
    return hours + minutes + amPm;
  };


  $scope.isLoggedIn = function () {
    if (Auth.getLoggedIn()){
      $scope.$emit('loggedIn');
    } else {
      // redirect
      $window.location.href = '/#/signin';
    }
  };
  $scope.isLoggedIn();
})

.controller('CreateSessionController', function ($scope, Session, Auth, $window) {
  $scope.session = {};
  // event is an array of session time objects w 3 properties: id, date, and time
  $scope.events = [];
  $scope.count = 1;
  $scope.myDate = new Date();
  $scope.minDate = new Date();
  $scope.id = null;

  var formatDate = function (date, time) {
    date = date.toString().split(' ');
    var months = {Jan:'01',Feb:'02',Mar:'03',Apr:'04',May:'05',Jun:'06',Jul:'07',Aug:'08',Sep:'09',Oct:'10',Nov:'11',Dec:'12'};
    var month = months[date[1]];
    var day = date[2];
    var year = date[3];

    return year + '-' + month + '-' + day + ' ' + time;
  };

  $scope.addEvent = function(){
    $scope.id = $scope.count++;
    $scope.events.push({iden:$scope.id, day: $scope.myDate, time: $scope.myTime})
  };

  $scope.deleteEvent = function(event){
    for(var i = 0; i < $scope.events.length; i++){
      if($scope.events[i].iden === event.id){
        $scope.events.splice(i, 1);
      }
    }
  }

  $scope.createSession = function (session) {
    console.log('clicked');
    session.startTime = $scope.events;
    console.log(session);
    console.log(session.startTime)
    /*formatDate($scope.myDate, $scope.time);*/

    // attaches UserId to session instance that gets created
    Auth.getSignedInUser().then(function (user){
      session.UserId = user.data.UserId;

      Session.createSession(session).then(function(){
        // redirect
        $window.location.href = '/#/';
      });
    });

  };

  $scope.isLoggedIn = function () {
    if (Auth.getLoggedIn()){
      $scope.$emit('loggedIn');
    } else {
      // redirect
      $window.location.href = '/#/signin';
    }
  };
  $scope.isLoggedIn();


});

