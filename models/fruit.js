///////////////////////////////////////////////
//////// Fruits model                   ///////// 
///////////////////////////////////////////////

//import the mongoose VARIABLE which holds the configuration. And this is on the file called connection.js
const mongoose = require('./connection');

//create the fruit schema
const FruitSchema = new mongoose.Schema({
    name: String, 
    readyToEat: Boolean,
    color: String,
    username: String
});

//variable that holds the configs and the schema
//this is the figurative 'key' that communicates with out db
const Fruits = mongoose.model('fruit', FruitSchema);

// export this Fruits variable
module.exports = Fruits;
