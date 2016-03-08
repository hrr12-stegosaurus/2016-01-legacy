myApp.controller('EditController', function ($rootScope, $scope, Upload, Session, Auth, $window, Calendar) {
  $scope.session = {};
  // event is an array of session time objects w 3 properties: id, date, and time
  $scope.events = [];
  $scope.count = 1;
  $scope.counter = 1;
  $scope.myDate = new Date();
  $scope.minDate = new Date();
  $scope.id = null;

  $rootScope.$on('edit', function(event, session) {
    $scope.$apply(function() {
      $scope.session = session;
      $scope.events = session.Calendars;
    })
    $scope.session = session;
    $scope.events = session.Calendars;
  })

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
      if($scope.events[i].iden === event.iden){
        $scope.events.splice(i, 1);
      }
    }
  }

  $scope.editSession = function (session) {
    session.startTime = $scope.events;

    Auth.getSignedInUser().then(function (user){
      session.UserId = user.data.UserId;
      Session.editSession(session);
      $window.location.href = '/#/profile';
    });

  };

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

