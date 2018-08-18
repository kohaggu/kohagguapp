// if(process.env.NODE_ENV === 'production'){
// module.exports = require('./keys_prod');
// }
// else {
//     module.exports = require('./keys_dev');
// }

module.exports = {
    mongoURI:'mongodb://harshit:scooby1234@ds151809.mlab.com:51809/notesdiyo',
   googleClientId:'266784449011-57isrt8sbicred5rtk4krrpic9ja20js.apps.googleusercontent.com',
   googleClientSecret:'G11DsSy7pCk9s3MU0Oit8BKQ',
   facebookClientID:'555049248228767',
   facebookClientSecret:'c0df033214e176888390edfb72e26f3a',
   callbackURL:'http://localhost:5000/auth/facebook/callback'
}