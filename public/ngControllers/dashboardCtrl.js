var app = angular.module("contacts");

app.controller("dashboardCtrl", function($scope, user, dashboardService, contactService) {

    $scope.user = user.data; 
    $scope.getdata = function(get){
        dashboardService.getTheData(get)
    };

    $scope.getCurrentUser = function(get){
        dashboardService.getCurrentUser(get)
    };

    $scope.createNewContact = function(newContact) {
        contactService.createContact(newContact).then(function(res) {
            Materialize.toast("Contact Created!", 2500, 'toast-success');
            $scope.getContacts();
        })
        .catch(function(err){
            console.log(err);
            console.log('warning', 'Opps!', 'Could not create Contact');
            Materialize.toast("Opps!, Your contact was not created", 2500, 'toast-warning');
        });
    };

    $scope.updateContact = function(contactDoc) {
        contactService.updateContact(contactDoc).then(function(res) {
            $scope.getContacts();
        }); 
        $('#contactDetails').trigger("reset");
    };

    $scope.deleteContact = function(id) {
        contactService.deleteContact(id).then(function(res) {
            $scope.getContacts();
        }); 
        $('#contactDetails').trigger("reset");
    };

    $scope.getContacts = function() {
        contactService.getContacts().then(function(data) {
            var contactArray = [];
            var contactTotal = 0;
            for (var i = 0; i < data.length; i++){
                if (user.data._id === data[i].userId  && user.data._id ){
                    //phoneNo = data[i].cellPhone;
                    //data[i].cellPhone = phoneNo.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
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
        rowTemplate:'<div style="height: 100%" ng-class="{closedRowColor: row.getProperty(\'status\') === \'Closed\'}"><div ng-style="{ \'cursor\': row.cursor }" ng-repeat="col in renderedColumns" ng-class="col.colIndex()" class="ngCell ">' +
                           '<div class="ngVerticalBar" ng-style="{height: rowHeight}" ng-class="{ ngVerticalBarVisible: !$last }"></div>' +
                           '<div ng-cell></div>' +
                     '</div></div>',
        enableColumnResize: true,
        selectedItems: $scope.selected,
        multiSelect: false,
        afterSelectionChange: function (row, event) {
            $scope.contact = $scope.selected[0];

            if ($scope.contact){
              $('#modal4').openModal();
            };
        },
        height: '200px',
        sortInfo: {fields: ['Contact Type', 'Last Name', 'First Name', 'City', 'State'], directions: ['asc']},
        columnDefs: [
            {field: 'contactType', displayName: 'Contact Type'},
            {field: 'last', displayName: 'Last Name'},
            {field: 'first', displayName: 'First Name'},
            {field: 'city', displayName: 'City'},
            {field: 'state', displayName: 'State'}
        ]
    };
});