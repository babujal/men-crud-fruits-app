/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require('dotenv').config(); //load env variables
const express = require('express'); // import express
const morgan = require('morgan'); //import morgan - morgan is a package that logs routes. (totally optional btw)
const methodOverride = require('method-override'); //import method override. Remember html forms only allows POST and GET. This expands on that limitation. We will be using PUT and DELETE also
const mongoose = require('mongoose'); //import mongoose - the package that allows the express application to interact w/ the mongodb 
const Fruits = require('./models/fruit')
const FruitRouter = require('./controllers/fruit');
const UserRouter = require('./controllers/user');
const MongoStore = require('connect-mongo');
const session = require('express-session');

const PORT = process.env.PORT;
const app = express(); 


/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////
app.use(morgan('tiny')); //makes use of morgan
app.use(methodOverride('_method')); //looks for the request's query parameter with a key of '_method' and will use the value (such as PUT or DELETE)
// app.use(express.json());// only use this if we are doing postman's body -> raw -> JSON 
app.use(express.urlencoded({ extended: true })); // parse urlencoded requests. reads form data
//How to create a session
app.use(session({
    secret: process.env.SECRET,
    store: MongoStore.create({mongoUrl: process.env.DBURL}),
    saveUninitialized: true,
    resave: false,
}));
app.use('/fruit', FruitRouter);
app.use('/user', UserRouter);

////////////////////////////////////////////
// Routes
////////////////////////////////////////////
//this will be a test route
app.get('/', async (req, res) => {
    const allFruits = await Fruits.find({});
    res.render("landing.ejs", { allFruits });
});

app.listen(PORT, () => {
    console.log(`Now listening to port: ${PORT}`);
});
