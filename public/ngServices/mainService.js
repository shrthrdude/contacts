var app = angular.module('contacts');

app.service('mainService', function($http) {
    this.signup = function(email, password) {
        return $http({
            method: 'POST',
            url: '/api/user/signup',
            data: {
                email: email, 
                password: password
            }
        }).then(function(dataResponse) {
            
        })
    }

    this.login = function(email, password) {
        return $http({
            method: 'POST',
            url: '/api/user/login',
            data: {
                email: email, 
                password: password
            }
        }).then(function(dataResponse) {
            
        })
    }
})