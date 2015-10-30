var app = angular.module("contacts");

app.controller("dashboardCtrl", function($scope, user, dashboardService, contactService) {

    $scope.user = user.data; 

    $scope.filterOptions = {
        filterText: ''
    };

    $scope.getdata = function(get){
        dashboardService.getTheData(get)
    };

    $scope.getCurrentUser = function(get){
        dashboardService.getCurrentUser(get)
    };

    $scope.createNewContact = function(newContact) {
        contactService.createContact(newContact).then(function(res) {
            Materialize.toast("Contact Created!", 2500, 'toast-success');
            $scope.newContact = '';
            $scope.getContacts();
        })
        .catch(function(err){
            console.log(err);
            console.log('warning', 'Opps!', 'Could not create Contact');
            Materialize.toast("Opps!, Your contact was not created", 2500, 'toast-warning');
        });
    };

    $scope.cancelOut = function(){
        $('.lean-overlay').remove() 
    }

    $scope.updateContact = function(contactDoc) {
        contactService.updateContact(contactDoc).then(function(res) {
            $scope.getContacts();
        }); 
        $('.lean-overlay').remove()
        $('#contactDetails').trigger("reset");
    };

    $scope.deleteContactInit = function(id) {
        $('#modal5').openModal();
    };

    $scope.deleteContact = function(id) {
        contactService.deleteContact(id).then(function(res) {
            $scope.getContacts();
        }); 
        $('.lean-overlay').remove()
        $('#contactDetails').trigger("reset");
    };

    $scope.getContacts = function() {
        contactService.getContacts().then(function(data) {
            var contactArray = [];
            var contactTotal = 0;
            for (var i = 0; i < data.length; i++){
                if (user.data._id === data[i].userId  && user.data._id ){
                    contactArray.push(data[i]);
                }
            }
            $scope.contacts = contactArray;
        });
    };
    
    $scope.getContacts();

    $scope.selected = [];
    $scope.contact = "";

    $scope.gridOptions = { 
        data: 'contacts',
        rowTemplate:'<div style="height: 100%"><div ng-style="{ \'cursor\': row.cursor }" ng-repeat="col in renderedColumns" ng-class="col.colIndex()" class="ngCell ">' +
                           '<div class="ngVerticalBar" ng-style="{height: rowHeight}" ng-class="{ ngVerticalBarVisible: !$last }"></div>' +
                           '<div ng-cell></div>' +
                     '</div></div>',
        enableColumnResize: true,
        selectedItems: $scope.selected,
        multiSelect: false,
        filterOptions: $scope.filterOptions,
        afterSelectionChange: function (row, event) {
            $scope.contact = $scope.selected[0];
            if ($scope.contact){
                $('#modal4').openModal();
            };
        },
        height: '200px',
        sortInfo: {fields: ['Last Name', 'First Name', 'City', 'State'], directions: ['asc']},
        columnDefs: [
            {field: 'last', displayName: 'Last Name'},
            {field: 'first', displayName: 'First Name'},
            {field: 'city', displayName: 'City'},
            {field: 'state', displayName: 'State'},
            {field: 'firstAddr', visible: false},
            {field: 'secondAddr', visible: false},
            {field: 'postal', visible: false},
            {field: 'country', visible: false},
            {field: 'homePhone', visible: false},
            {field: 'mobilePhone', visible: false},
            {field: 'workPhone', visible: false},
            {field: 'workExt', visible: false},
            {field: 'firstEmail', visible: false},
            {field: 'secondEmail', visible: false},
            {field: 'company', visible: false},
            {field: 'comment', visible: false},
            {field: 'linkedin', visible: false},
            {field: 'facebook', visible: false},
            {field: 'twitter', visible: false},
        ]
    };
});