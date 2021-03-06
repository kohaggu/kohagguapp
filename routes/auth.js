const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google',
{scope: ['profile','email']}));//means what we require from google 

router.get('/google/callback',
passport.authenticate('google',{failureRedirect:'/'}),
(req,res)=>{
res.redirect('/dashboard');
    //res.redirect('/dashboard');
});
router.get('/verify', (req,res)=>{
if(req.user){
    console.log('authenticated');
}
else {
    console.log('not auth');
}
});
router.get('/logout' ,(req,res) => {
req.logout();
res.redirect('/');
});
// facebook
// router.get('/facebook',
//   passport.authenticate('facebook'));

// router.get('/facebook/callback',
//   passport.authenticate('facebook', { failureRedirect: '/' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.send('facebook auth done');
//   })
module.exports = router;