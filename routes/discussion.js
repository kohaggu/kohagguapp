const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Discuss = mongoose.model('discussion')
const User = mongoose.model('users');
const {ensureAuthenticated, ensureGuest} = require('../helpers/ensureauth');


router.get('/', (req,res) => {
  Discuss.find({})
  .populate('user')
  .sort({date:'desc'})
  .then(discuss => {
      res.render('discussions/index', {
      discuss: discuss
    });
  });
});
router.get('/creatediscussion',ensureAuthenticated, (req,res) => {
    res.render('discussions/add');
});
//show particular dicussion
router.get('/show/:id' , (req,res) => {
Discuss.findOne({_id: req.params.id})
.then(discuss => {
  res.render('discussions/show');
  discuss:discuss
});
});
//create disucssion route
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

  // Create discuss
  new Discuss(newDiscuss)
    .save()
    .then(discuss => {
      res.redirect(`/discuss/redirectwork`);
    });
});
//edit form route
router.get('/edit/:id', (req,res) => {
  Discuss.findOne({
    _id: req.params.id
  })
  .then(discuss => {
    if(discuss.user != req.user.id){
      res.redirect('/discuss');
    } else {
      res.render('discussions/edit', {
        discuss: discuss
      });
    }
  });

});

// Edit Form Process
router.put('/:id', (req, res) => {
  Discuss.findOne({
    _id: req.params.id
  })
  .then(discuss => {
    let allowComments;
    
    if(req.body.allowComments){
      allowComments = true;
    } else {
      allowComments = false;
    }

    // New values
    discuss.title = req.body.title;
    discuss.body = req.body.body;
    discuss.status = req.body.status;
    discuss.allowComments = allowComments;

    discuss.save()
      .then(discuss => {
        res.redirect('/dashboard');
      });
  });
});
//delete discussion route
router.delete('/delete/:id' , (req,res) => {
   Discuss.remove({
     _id: req.params.id
   })
   .then(() => {
     res.redirect('/dashboard');
   })
});

module.exports = router;