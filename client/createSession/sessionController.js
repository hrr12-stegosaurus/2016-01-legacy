
myApp.controller('SessionController', function ($scope, Session, Auth, Review, $window, Calendar) {

  $scope.sessions = [];

  $scope.getSessions = function () {
    Session.getSessions()
    .then(function (sessions) {
      $scope.sessions = sessions;
    });
  };

  $scope.getSessions();
  $scope.isClicked = false;

  $scope.register = function (session, date){

    Auth.getSignedInUser().then(function (signed) {
      Auth.getUser(signed.data.UserId, function(user) {

        var registerInfo = {
          tutor:  session.User.username,
          tutorId: session.User.id,
          UserId: signed.data.UserId,
          tutorEmail: session.User.email,
          tuteeEmail: user.data.email,
          topic: session.topic,
          description: session.description,
          link: session.link,
          category: session.category,
          date: date,
          image: session.image
        };

        Session.register(registerInfo);
      })
    })

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

//*** Start Reviews section. ***//

  $scope.review = { rating: null };
  $scope.allRatings = {};
  $scope.averageRatings = {};

  // Send reviews to server/db. Object with rating and userId properties.
  $scope.submitReview = function (userId) {
    var rating = $scope.review.rating;
    Review.sendReviewToServer({rating, userId});
    $scope.getAllReviews();
  };

  // Get average ratings for user.
  $scope.getAllReviews = function (userId) {
    Review.getReviewsFromServer(userId).then(function(averageRatings) {
      $scope.averageRatings = averageRatings;
    });
  };

  // Get all ratings on page load.
  $scope.getAllReviews();

//*** End reviews section. ***//

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
  $scope.displayTime = function(time){
    return Calendar.displayTime(time);
  }


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

.controller('CreateSessionController', function ($scope, Upload, Session, Auth, $window, Calendar) {
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
    console.log('delete works')
    console.log(event)
    for(var i = 0; i < $scope.events.length; i++){
      if($scope.events[i].iden === event.iden){
        $scope.events.splice(i, 1);
      }
    }
  }

  $scope.createSession = function (session) {
    console.log('clicked');
    session.startTime = $scope.events;
    //console.log(session, '*************')

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

  // upload on file select or drop
  $scope.upload = function (file) {
    var r = new FileReader();
    r.onload = function(){
      console.log(r.result);
      $scope.session.image = r.result;
    };
    r.readAsDataURL(file);
    $scope.file=file;
      Upload.upload({
          url: 'upload/url',
          data: {file: file, 'username': $scope.username}
      }).then(function (resp) {
          console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
      }, function (resp) {
          console.log('Error status: ' + resp.status);
      }, function (evt) {
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
      });
  };

    //format time for display on session card
  $scope.displayTime = function(time){
    return Calendar.displayTime(time);
  }

});

