const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Discuss = mongoose.model('discussion')
const User = mongoose.model('users');
const {ensureAuthenticated, ensureGuest} = require('../helpers/ensureauth');


router.get('/', (req,res) => {
res.send('here stories will appear');
});
router.get('/creatediscussion',ensureAuthenticated, (req,res) => {
    res.render('discussions/add');
});
//add discussion form
router.get('/redirectwork', (req,res) => {
    res.send('Redirect work');
})
router.post('/creatediscussion', (req,res) => {
let allowComments;

  if(req.body.allowComments){
    allowComments = true;
  } else {
    allowComments = false;
  }

  const newDiscuss = {
    title: req.body.title,
    body: req.body.body,
    subject: req.body.subject,
    allowComments:req.body.allowComments,
    user: req.user.id
  }

  // Create Story
  new Discuss(newDiscuss)
    .save()
    .then(discuss => {
      res.redirect(`/discuss/redirectwork`);
    });
});

module.exports = router;