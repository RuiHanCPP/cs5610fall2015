var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');

app.use(express.static(__dirname + '/public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

var connectionString = 'mongodb://127.0.0.1:27017/cs5610';

if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
    process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
    process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
    process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
    process.env.OPENSHIFT_APP_NAME;
}

var db = mongoose.connect(connectionString);

var userSchema = mongoose.Schema({
	"id": String,
	"firstName": String,
	"lastName": String,
	"username": String,
	"password": String,
}, {collection: "cs5610.assignment.user"});

var userModel = mongoose.model("cs5610.assignment.user", userSchema);

/*
userModel.create({id:1233, firstName: "haha", lastName: "hoho", username: "a", password: "b"}, function(err, users) {
	if (err) {
		console.err(err);
	} else {
		console.log(users);
	}
});
*/

userModel.find(function(err, users) {
	if (err) {
		console.err(err);
	} else {
		console.log(users.length);
	}
});
/*
userModel.update({id:1233}, {id:341231231235}, function(err, users) {
	if (err) {
		console.err(err);
	} else {
		console.log(users);
	}
});

userModel.find({username: "alice", password: "alice"}, function(err, user) {
	if (err) {
		console.err(err);
	} else {
		console.log(user);
	}
})
*/

app.listen(port, ipaddress);