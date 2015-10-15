var app = angular.module('contacts', ['ngRoute', 'ngGrid']);

app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'view/main.html',
      controller: 'mainCtrl',
      resolve: {
        user: function(dashboardService){
          return dashboardService.getUser().then(function(response){ 
            return response;
          });
        }
      }
    })
    .when('/dashboard', {
      templateUrl: 'view/dashboard.html',
      controller: 'dashboardCtrl',
      resolve: {
        user: function(dashboardService){
          return dashboardService.getUser().then(function(response){ 
            return response;
          });
        }
      }
    })
    .when('/logout', {
        templateUrl: '/logout'
    })
    .when('/about', {
      templateUrl: 'view/about.html'
    })
    .otherwise({
      redirectTo: '/'
    });
});