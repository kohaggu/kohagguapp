const express = require('express');
const router = express.Router();

router.get('/physics',(req,res) => {
    res.render('subject/physics');
});

router.get('/chemistry', (req,res) => {
    res.render('subject/chemistry');
});

router.get('/maths', (req,res) => {
    res.render('subject/maths');
});

router.get('/computer', (req,res) => {
    res.render('subject/computer');
});

module.exports = router;