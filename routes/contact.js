const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
var smtpTransport = nodemailer.createTransport({
    service: "Gmail",  // sets automatically host, port and connection security settings
    auth: {
        user: "harshit.kohli1997@gmail.com",
        pass: "**********"
    }
 });
 smtpTransport.sendMail({  //email options
    from:"shwetakhl58@gmail.com", // sender address.  Must be the same as authenticated user if using GMail.
    to: "harshit.kohli1997@gmail.com", // receiver
    subject: "Emailing with nodemailer", // subject
    text: "Email Example with nodemailer" // body
 }, function(error, response){  //callback
    if(error){
        console.log(error);
    }else{
        console.log("Message sent: " + response.message);
    }
    
    smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
 }); 
});
 module.exports = router;