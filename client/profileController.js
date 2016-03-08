myApp.controller('ProfileController', function ($scope, Session, Auth, Calendar, Review, $window) {
  $scope.sessions;
  $scope.username;
  $scope.email;
  $scope.age;
  $scope.userId;
  $scope.registered;
  $scope.averageRating;
  $scope.review = { rating: null };
  $scope.reviewSubmitted = false;

  $scope.displayTime = function(time){
    return Calendar.displayTime(time);
  };

  $scope.getUser = function() {
    Auth.getSignedInUser().then(function (user) {
      Auth.getUser(user.data.UserId, function(user) {
<<<<<<< dfc9dcf2b27a30046c2e640d471588f77ab0b41b
=======
        $scope.userId = user.data[0].id;
>>>>>>> (feat) Display "thank you for feedback" text.
        $scope.age = user.data[0].createdAt;
        $scope.username = user.data[0].username;
        $scope.email = user.data[0].email;
        Review.getReviewsFromServer(user.data[0].id).then(function(averageRatings) {
          $scope.averageRating = averageRatings[user.data[0].id];
          console.log('$scope.averageRating inside getAverageRatings function: ', $scope.averageRating)
        });
        Session.getUserSessions(user.config.data.userId, function(sessions) {

          $scope.sessions = sessions;
        });
        Session.getRegistered(user.config.data.userId, function(registered) {
          $scope.registered = registered;
        });
      });
    });
  };

  $scope.delete = function (session) {
    Session.deleteSession(session, function(data) {
      $scope.getUser();
    });
  }

  $scope.deleteAccount = function(){
    Auth.getSignedInUser().then(function(user){
      Auth.deleteUser(user.data.UserId)
    }).then(function(){
      $window.location.href = '/#/';
    })
  }

  $scope.i = 0;

  $scope.nextCard = function(i){
    if($scope.i < $scope.sessions.length - 1){
      $scope.i +=1;
      console.log($scope.sessions);
    }
  }

  $scope.prevCard = function(i){
    if($scope.i > 0){
      $scope.i -=1;
      /*console.log($scope.sessions);*/
    }
  }

  $scope.j = 0;

  $scope.nextLearnCard = function(j){
    if($scope.j < $scope.registered.length - 1){

      $scope.j +=1;
    }
  }

  $scope.prevLearnCard = function(j){
    if($scope.j > 0){
      $scope.j -=1;
    }
  }

  // Send reviews to server/db. Object with rating and userId properties.
  $scope.submitReview = function (userId) {
    var rating = $scope.review.rating;
    console.log('$scope.rating: ', $scope.review.rating, ', userId: ', userId)
    Review.sendReviewToServer({rating, userId});
  };

  $scope.getUser();
})