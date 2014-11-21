var registerSIP = function() {
  var server = document.querySelector('#server').value,
      username = document.querySelector('#username').value,
      extension = document.querySelector('#extension').value;

  var configuration = {
    uri: username+'@'+server,
    traceSip: true
  },
  options = {
    media: {
      constraints: {
        audio: true,
        video: true
      },
      render: {
        remote: { video: document.getElementById('remote') },
        local: { video: document.getElementById('local') }
      }
    }
  };

  var session, ua, target;

  target = 'sip:'+extension+'@'+server;

  ua = new SIP.UA(configuration);
  ua.on('invite', function(incomingCall) {
    incomingCall.accept(options);
  });

  document.getElementById('submit').addEventListener('click', function(e) {
    e.preventDefault();

    session = ua.invite(target, options);
    session.on('bye', function() {
      session = null;
    });
  });
}

var app = angular.module('nw-demo', ['ngRoute']);
app.config(function($routeProvider) {
  $routeProvider.when('/', {
    controller: 'VideosController',
    templateUrl: '_videos.html'
  });
});

app.controller('VideosController', function($scope) {

  $scope.register = function() {
    registerSIP();
  };
});

var gui = window.require('nw.gui'),
    appWindow = gui.Window.get();
appWindow.showDevTools();
