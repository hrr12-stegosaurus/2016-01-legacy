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

  $scope.getUser();
})