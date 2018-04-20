const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('./keys');
const FacebookStrategy = require('passport-facebook');
// load user model 
 const User = mongoose.model('users');


module.exports = function(passport){
    passport.use(
        new GoogleStrategy({
            clientID:keys.googleClientId,
            clientSecret:keys.googleClientSecret,
            callbackURL:'/auth/google/callback',
            proxy: true
        },(acessToken,refreshToken,profile,done) => {
      //  console.log(acessToken);
        //console.log(profile);
        const image = profile.photos[0].value.substring(0,profile.photos[0].value.indexOf('?'));
        
        const newUser = User(); 
           newUser.google.googleID = profile.id;
            newUser.google.firstName =profile.name.givenName;
            newUser.google.lastName =profile.name.familyName;
            newUser.google.email = profile.emails[0].value;
            newUser.google.image = image;
        
        // chedck for existing user
    User.findOne({
        googleID: profile.id
    })   .then(user =>{
        if(user){
            // return user
            done(null,user);
        } else {
            // create user
             newUser.save()
             .then(user => done(null,user));

        }
    })
    })
    
    );
    passport.serializeUser((user,done)=>{
        done(null,user.id);
    });
    passport.deserializeUser((id,done)=>{
    User.findById(id).then(user => done (null,user));
    }); 

    passport.use(new FacebookStrategy({
        clientID: keys.facebookClientID,
        clientSecret: keys.facebookClientSecret,
        callbackURL: keys.callbackURL
      },
      function(accessToken, refreshToken, profile, done) {
        process.nextTick(() => {
            User.findOne({'facebook.facebookID': profile.id}, (err,user) => {
                if(err)
                return done(err);
                if(user)
                return done(null,user);
                else {
                    const image = profile.photos[0].value.substring(0,profile.photos[0].value.indexOf('?'));
        
        const newUser = User()
            newUser.facebook.facebookID =profile.id;
            newUser.facebook.firstName =profile.name.givenName;
            newUserfacebook.lastName =profile.name.familyName;
            newUseremail= profile.emails[0].value;
            newUser.image = image;
        
        newUser.save(() => {
                 if(err)
                 throw err;
                 return done(null,newUser)

             })
                }

            })
        })
      }
    ));
};