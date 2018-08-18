const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const Tution = mongoose.model('tution');

//body parser middleware


router.get('/', (req,res) => {
    res.render('tution/show');
});

router.get('/register', (req,res) => {
    res.render('tution/register');
});

router.post('/find', (req,res) => {
    
Tution.find({pincode:req.body.pincode, subject:req.body.subject})
.then(tution => {
res.render('tution/find',{
    tution:tution
})
})
});

router.post('/register', (req,res) => {

Tution.findOne({teachername: req.body.teachername})
.then((ttn) => {
    if(ttn)
    {
        res.send('email already exist')
    }
    else{
        const ttn = {
            teachername:req.body.teachername,
            address:req.body.address,
            pincode:req.body.pincode,
            subject:req.body.subject,
            contactnumber : req.body.contactnumber,
            fees: req.body.fees
            }
            
            new Tution(ttn)
            .save()
            .then(ttn => {
                res.redirect('/tution');
            })
    }
})






});

module.exports = router;

