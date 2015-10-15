var app = angular.module('contacts');

app.service('contactService', function($http, $q) {

	this.createContact = function(newContact) {
	  	return $http({
	    method: 'POST',
	    url: '/api/contact/create',
	    data: {
	    	contactType: newContact.contactType,
	    	title: newContact.title,
	    	first: newContact.first,
	    	last: newContact.last,
	    	firstAddr: newContact.firstAddr,
	    	secondAddr: newContact.secondAddr,
	    	city: newContact.city,
	    	state: newContact.state,
	    	postal: newContact.postal,
	    	country: newContact.country,
	    	homePhone: newContact.homePhone,
	    	mobilePhone: newContact.mobilePhone,
	    	workPhone: newContact.workPhone,
	    	workExt: newContact.workExt,
	    	firstEmail: newContact.firstEmail,
	    	secondEmail: newContact.secondEmail,
	    	company: newContact.company,
	    	comment: newContact.comment,
	    	linkedin: newContact.linkedin,
	    	facebook: newContact.facebook,
	    	twitter: newContact.twitter
	  	}
	}).then(function(dataResponse) {
 
    })

	}

	 this.getContacts = function(){
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: '/api/contacts'
        }).then(function(response) {
            deferred.resolve(response.data)
        });
        return deferred.promise;
    }

    this.updateContact = function(contact) {
	    return $http({
	      method: 'PUT',
	      url: '/api/contacts/' + contact._id,
	      data: contact
	    });
  	}

	this.deleteContact = function(id) {
	 	return $http({
		    method:'DELETE',
		    url: '/api/contacts/' + id
	  	});
	}
})
