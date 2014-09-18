var app = angular.module('nw-demo', ['ngRoute']);
app.config(function($routeProvider) {
  $routeProvider.when('/', {
    controller: 'VideosController',
    templateUrl: '_videos.html'
  });
});

app.controller('VideosController', function($scope) {});

window.onload = function() {
  document.getElementById('submit').addEventListener('click', function(e) {
    e.preventDefault();

    var server = document.querySelector('#server').value,
        username = document.querySelector('#username').value,
        password = document.querySelector('#password').value,
        extension = document.querySelector('#extension').value;

    var configuration = {
      register: true,
      registerExpires: 90,
      registrarServer: 'sip:'+server,
      stunServers: [null],
      wsServers: 'ws://'+server+':8088/ws',
      uri: 'sip:'+username+'@'+server,
      authorizationUser: username,
      password: password,
      displayName: username,
      hackIpInContact: true,
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
    session = ua.invite(target, options);
    session.on('bye', function() {
      session = null;
    });
    ua.on('invite', function(incomingCall) {
      incomingCall.accept(options);
    });
  });
};
