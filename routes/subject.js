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
router.post('/physics', (req,res) => {
    if(req.body.class != 'ALL')
    {
    Notes.find({class:req.body.class,subject:'physics'})
    .then(notes => {
     res.render('subject/physics',{
          notes:notes
     });
    })
}
else 
 {
    Notes.find({subject:'physics'})
    .then(notes => {
     res.render('subject/physics',{
          notes:notes
     });
    })
 }
 });


router.get('/chemistry', (req,res) => {
   Notes.find({subject:'chemistry'})
   .then(notes => {
    res.render('subject/chemistry',{
         notes:notes
    });
   })

});

router.post('/chemistry', (req,res) => {
    if(req.body.class != 'ALL')
    {
    Notes.find({class:req.body.class,subject:'chemistry'})
    .then(notes => {
     res.render('subject/chemistry',{
          notes:notes
     });
    })
}
else 
 {
    Notes.find({subject:'chemistry'})
    .then(notes => {
     res.render('subject/chemistry',{
          notes:notes
     });
    })
 }
 });

router.get('/maths', (req,res) => {
    Notes.find({subject:'maths'})
    .then(notes => {
     res.render('subject/maths',{
          notes:notes
     });
    })
});
router.post('/maths', (req,res) => {
    if(req.body.class != 'ALL')
    {
    Notes.find({class:req.body.class,subject:'maths'})
    .then(notes => {
     res.render('subject/maths',{
          notes:notes
     });
    })
}
else 
 {
    Notes.find({subject:'maths'})
    .then(notes => {
     res.render('subject/maths',{
          notes:notes
     });
    })
 }
 });

router.get('/computer', (req,res) => {
    res.render('subject/computer');
});

module.exports = router;