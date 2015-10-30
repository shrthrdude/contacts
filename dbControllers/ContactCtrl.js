var Contact = require('../dbModels/Contacts.js');
var User = require('../dbModels/User.js');
var mongoose = require('mongoose');

module.exports = {

  createContact: function(req, res){
    Contact.create({
      first: req.body.first,
      last: req.body.last,
      firstAddr: req.body.firstAddr,
      secondAddr: req.body.secondAddr,
      city: req.body.city,
      state: req.body.state,
      postal: req.body.postal,
      country: req.body.country,
      homePhone: req.body.homePhone,
      mobilePhone: req.body.mobilePhone,
      workPhone: req.body.workPhone,
      workExt: req.body.workExt,
      firstEmail: req.body.firstEmail,
      secondEmail: req.body.secondEmail,
      company: req.body.company,
      comment: req.body.comment,
      linkedin: req.body.linkedin,
      facebook: req.body.facebook,
      twitter: req.body.twitter, 
      userId: req.user._id
    },
     function(err, contact){
      if(contact){
        User.findByIdAndUpdate(req.user._id, 
            {$push: {contactId: contact._id}},
            function(err, contact){
              return res.json(contact);
              if(err) {
                return res.status(500).end(); 
              }
              return res.json(contact); 
            });
      }
    });
   
  },

  getContacts: function(req, res) {
    Contact.find({}, function(err, result) {
      if(err) {
        return res.status(500).end();
      }
      return res.json(result);
    });
  },
 
  updateContact: function(req, res){
    Contact.findByIdAndUpdate(req.params.id, {
      first: req.body.first,
      last: req.body.last,
      firstAddr: req.body.firstAddr,
      secondAddr: req.body.secondAddr,
      city: req.body.city,
      state: req.body.state,
      postal: req.body.postal,
      country: req.body.country,
      homePhone: req.body.homePhone,
      mobilePhone: req.body.mobilePhone,
      workPhone: req.body.workPhone,
      workExt: req.body.workExt,
      firstEmail: req.body.firstEmail,
      secondEmail: req.body.secondEmail,
      company: req.body.company,
      comment: req.body.comment,
      linkedin: req.body.linkedin,
      facebook: req.body.facebook,
      twitter: req.body.twitter, 
      userId: req.user._id
      })
      .exec(function(err, result){ 
        if(err) {
          return res.status(500).end();
        } 
        return res.json(result); 
      })
  },

  deleteContact: function(req, res){
    Contact.findByIdAndRemove(req.params.id, function(err, result) {
      if (err) {
        return res.status(500).json(err);
      }
      return res.json(result);
    });
  }

};
