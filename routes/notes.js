const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Notes = mongoose.model('notes');
router.get('/add/notes/admin', (req,res) => {
    res.render('notes/notes');
});

router.post('/addnotes', (req,res) => {
    const notes = {
        subject:req.body.subject,
        class:req.body.class,
        link:req.body.link,
        name:req.body.name
    }
    console.log(notes);
new Notes(notes)
.save()
.then(notes => {
    res.redirect('/add/notes/admin')
})



})



module.exports = router;