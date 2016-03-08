myApp.controller('ProfileController', function ($scope, Session, Auth, Calendar, $window) {
  $scope.sessions;
  $scope.username;
  $scope.email;
  $scope.age;
  $scope.userId;
  $scope.registered;

  $scope.displayTime = function(time){
    return Calendar.displayTime(time);
  }

  $scope.getUser = function() {
    Auth.getSignedInUser().then(function (user) {
      console.log('DATA: ', user.data.UserId)
      Auth.getUser(user.data.UserId, function(user) {
        console.log('/////////')
        console.log(user)
        $scope.age = user.data[0].createdAt;
        $scope.username = user.data[0].username;
        $scope.email = user.data[0].email;
        Session.getUserSessions(user.config.data.userId, function(sessions) {
<<<<<<< 1d2c72c76c6312ae6326f2bb0ef481cc1f35aba9

=======
>>>>>>> (style) classes taught and registered side-by-side
          $scope.sessions = sessions;
        })
        Session.getRegistered(user.config.data.userId, function(registered) {
          $scope.registered = registered;
          console.log(registered, '*********')
        })
      })
    })
  }

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

<<<<<<< 1d2c72c76c6312ae6326f2bb0ef481cc1f35aba9
=======
  $scope.j = 0;

  $scope.nextLearnCard = function(j){
    if($scope.j < $scope.registered.length - 1){
      console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$');
      console.log($scope.registered);
      $scope.j +=1;
    }
  }

  $scope.prevLearnCard = function(j){
    if($scope.j > 0){
      $scope.j -=1;
    }
  }


>>>>>>> (style) classes taught and registered side-by-side
  $scope.getUser();
})