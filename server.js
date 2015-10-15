// Dependencies
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var fs = require("fs");
var mongojs = require('mongojs');
var db = mongojs('users', ['user']);
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var http = require('http');
var bcrypt = require('bcrypt-nodejs');
var localStrategy = require('passport-local').Strategy;

require('./passport')(passport);

// Controllers

var UserCtrl = require('./dbControllers/UserCtrl');
var ContactCtrl = require('./dbControllers/ContactCtrl');

var User = require('./dbModels/User');

// Express
var app = express();

// Middleware 
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());

app.use(session({ secret: 'contact',
   resave: false,
   saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Passport
function auth(req, res, next){
   if(req.user){
       next();
   }
}

app.post('/api/user/login', passport.authenticate('local-login'), function(req, res){
   User.find({_id: req.user._id})
   .exec().then(function(user) {
        if (!user) {
            return res.status(404).end();
        }
        return res.json(user);
    });
});

app.post('/api/user/signup', passport.authenticate('local-signup'), function(req, res){
   User.find({_id: req.user._id})
   .exec().then(function(user) {
        if (!user) {
            return res.status(404).end();
        }
        return res.json(user);
    });
});


app.get('/logout', function(req, res) {
       req.logout();
       res.redirect('/');
});

app.get('/api/user/', function(req, res){
  res.status(200).json(req.user); 
});

app.get('/api/user/:user_id', function(req, res) {
    User.find({_id: req.params.user_id})
    .populate('user')
    .exec().then(function(user) {
        if (!user) {
            return res.status(404).end();
        }
        return res.json(user);
    });
});

app.get('/auth', auth, function(req, res){
    // res.send(req.user)
    User.find({_id: req.user._id})
    .populate('user')
    .exec().then(function(user) {
        if (!user) {
            return res.status(404).end();
        }
        return res.json(user);
    });
});

app.get('/api/user/auth', function(req, res) {
    user.find({}).exec().then(function(user) {
        return res.json(user);
      });
}); 

app.put('/api/users/:id', UserCtrl.updateUser)

// Contacts endpoints

app.post('/api/contact/create', ContactCtrl.createContact);

app.get('/api/contacts', ContactCtrl.getContacts);

app.put('/api/contacts/:id', ContactCtrl.updateContact);

app.delete('/api/contacts/:id', ContactCtrl.deleteContact);

// Connections
var port = 2015;
var mongoUri = 'mongodb://localhost:27017/contact';

mongoose.connect(mongoUri);
mongoose.connection.once('open', function() {
  console.log('Connected to MongoDB at ', mongoUri);
});

app.listen(port, function() {
  console.log('Listening on port ', port);
});

