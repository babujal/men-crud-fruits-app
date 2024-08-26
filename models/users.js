///////////////////////////////////////////////
//////// Fruits model                   ///////// 
///////////////////////////////////////////////

//import the mongoose VARIABLE which holds the configuration. And this is on the file called connection.js
const mongoose = require('./connection');

//create the fruit schema
const UserSchema = new mongoose.Schema({
    username: {type: String, require: true, unique: true},
    password: {type: String, require: true}
});

//variable that holds the configs and the schema
//this is the figurative 'key' that communicates with out db
const Users = mongoose.model('user', UserSchema);

// export this Fruits variable
module.exports = Users;

//Run the bellow npm install for user autentification using cookies
// npm install bcryptjs express-session connect-mongo
//bcryptjs: package that encrypts passwords
//we need to encrpty because we cannot just save raw password in the db

// express-session: middleware for create session cookies
// this middle ware will determine if we are logged in or not from the presence of a cookie
// and this cookie must be valid

//connect-mongo: allows express sesssion to save data in our mongo db