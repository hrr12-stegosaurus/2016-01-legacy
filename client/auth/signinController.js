
// invokes function from mainFactory.js to sign in a user
myApp.controller('SigninController', function ($scope, Auth, $window, $location, $routeParams) {
  $scope.param = $location.search();
  $scope.param = $routeParams.type;

  $scope.user = {};
  $scope.signin = function (user) {
    Auth.signin(user).then(function (user){
        Auth.setLoggedIn(true);
        // redirect
        $window.location.href = '/#/create';
    });
  };
});
