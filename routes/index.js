const express = require('express');
const {ensureAuthenticated,ensureGuest} = require('../helpers/ensureauth');
const mongoose = require('mongoose');
const Discuss = mongoose.model('discussion')
const User = mongoose.model('users');
const router = express.Router();


router.get('/', (req,res) => {
    res.render('index/welcome');
});

router.get('/about',(req,res) => {
   res.render('layouts/about');
});
router.get('/dashboard', ensureAuthenticated,(req,res) => {
Discuss.find({user:req.user.id})
.then(discuss =>{
  res.render('index/dashboard',{
    discuss:discuss
  });
});
});


module.exports = router;