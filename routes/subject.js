const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Notes = mongoose.model('notes');

router.get('/physics',(req,res) => {
    Notes.find({subject:'physics'})
    .then(notes => {
     res.render('subject/physics',{
          notes:notes
     });
    })
});

router.get('/chemistry', (req,res) => {
   Notes.find({subject:'chemistry'})
   .then(notes => {
    res.render('subject/chemistry',{
         notes:notes
    });
   })

});

router.get('/maths', (req,res) => {
    Notes.find({subject:'maths'})
    .then(notes => {
     res.render('subject/maths',{
          notes:notes
     });
    })
});

router.get('/computer', (req,res) => {
    res.render('subject/computer');
});

module.exports = router;