var app = angular.module("contacts");

app.controller("mainCtrl", function($scope, $location, mainService, dashboardService, contactService) {

    dashboardService.getUser().then(function(user){
        $scope.show = user.data
    });
    
    
    // Register

    $scope.submit = function(email, password, username) {
        var newUser = {
            email: $scope.email,
            password: $scope.reg_password,
            username: $scope.username
        };

        mainService.signup(email, password, username).then(function(res){
            Materialize.toast("Account Created!", 2500, 'toast-success');
            $('#modal1').closeModal();
            $location.path("/dashboard/");
            $scope.email = '';
            $scope.reg_password = '';
            $scope.password_confirm = '';
            $scope.username = '';
            $scope.show = true;
        })
        .catch(function(err){
            console.log(err);
            console.log('warning', 'Opps!', 'Could not register');
            $('#modal1').closeModal();
            Materialize.toast("Opps!, You were not registered", 2500, 'toast-warning');
        });

    };


    // Login


    $scope.submitLogIn = function(email, password) {
        mainService.login(email, password).then(function(login) {
            Materialize.toast("You are now logged in!", 2500, 'toast-success');
                $('#modal2').closeModal();
                $location.path("/dashboard/");
                $scope.email = '';
                $scope.reg_password = '';
                $scope.user = dashboardService.getUser();
                $scope.show = true;
        }).catch(function(err) {
            $scope.error = err.message;
            console.log('warning', 'Opps!', 'Could not login');
            Materialize.toast("Incorrect Username/Password!", 2500, 'toast-warning');
            $scope.password = '';
            
        });
    };
  
});