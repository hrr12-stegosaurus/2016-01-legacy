myApp.controller('ProfileController', function ($scope, Session, Auth) {
  $scope.sessions;
  $scope.username;
  $scope.email;
  $scope.age;
  $scope.userId;

  $scope.getUser = function() {
    Auth.getSignedInUser().then(function (user) {
      Auth.getUser(user.data.UserId, function(user) {
        $scope.age = user.data.createdAt;
        $scope.username = user.data.username;
        $scope.email = user.data.email;
        Session.getUserSessions(user.config.data.userId, function(sessions) {
          $scope.sessions = sessions;
        })
      })
    })
  }

  $scope.delete = function (session) {
    Session.deleteSession(session, function(data) {
      $scope.getUser();
    });
  }

  $scope.getUser();
})