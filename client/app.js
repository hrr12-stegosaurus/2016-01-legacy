//ngMaterial included for datepicker
var myApp = angular.module("myApp", ['ngRoute', 'ngMaterial', 'ngFileUpload']);

myApp.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'main.html',
      controller: 'SessionController'
    })
    .when('/signin', {
      templateUrl: 'auth/signin.html',
      controller: 'SigninController'
    })
    .when('/signup', {
      templateUrl: 'auth/signup.html',
      controller: 'SignupController'
    })
    .when('/create', {
      templateUrl: 'createSession/createSession.html',
      controller: 'CreateSessionController'
    })

    .when('/profile', {
      templateUrl: 'profile.html',
      controller: 'ProfileController'
    })
    .when('/payment', {
      templateUrl: 'payments/payments.html',
      controller: 'PaymentsController'
    })
    .otherwise({
      redirectTo: '/'
    });
});
