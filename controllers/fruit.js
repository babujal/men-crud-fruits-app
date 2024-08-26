
const express = require('express');
const Fruits = require('../models/fruit');

const router = express.Router();

////////////////////////////////////
///Router Middleware to protect fruit.js////
////////////////////////////////////
router.use((req, res, next) => {
    if(req.session.loggedIn){
        next();
    } else {
        res.redirect("user/login");
    }
})

router.get('/', async (req, res) => {
    const fruits = await Fruits.find({username: req.session.username});
    res.render('index.ejs', {fruits})
});

router.get('/new', async (req, res) => {
    res.render('new.ejs');
});

router.post('/', async (req, res) => {
    //convert the string to be boolean
    req.body.readyToEat = req.body.readyToEat === 'on' ? true : false;
    //we have req.session available to us
    //for every fruit we will save a username property to it
    req.body.username = req.session.username;
    await Fruits.create(req.body);
    res.redirect('/fruit');
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const fruit = await Fruits.findById(id);
    res.render('edit.ejs', { fruit });
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    req.body.readyToEat = req.body.readyToEat === 'on' ? true : false;
    await Fruits.findByIdAndUpdate(id, req.body);
    res.redirect('/fruit');
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    await Fruits.findByIdAndDelete(id);
    res.redirect('/fruit');
});



module.exports = router;