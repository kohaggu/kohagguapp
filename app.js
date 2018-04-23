const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

const keys = require('./config/keys');
//loading models
require('./models/User')
require('./models/Discuss');
// Passport Config
require('./config/passport')(passport);
//setting up routes
const discussion = require('./routes/discussion');
const index = require('./routes/index');
const auth = require('./routes/auth');
// Map global promises
mongoose.Promise = global.Promise;
// Mongoose Connect
mongoose.connect(keys.mongoURI, {
  
})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

  
const app = express();
//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Method override middleware
app.use(methodOverride('_method'));
// Handlebars Middleware

const {
    truncate,
    stripTags,
    formatDate,
    select
  } = require('./helpers/hbs');
  
app.engine('handlebars', exphbs({
  helpers:{ // to help the handlebars in formating
truncate:truncate,
stripTags:stripTags,
formatDate:formatDate,
select:select
  },
  defaultLayout:'main'
}));
app.set('view engine', 'handlebars');
//cookie parser and express session middleware
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Set global varsrs
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
  });
  //set static folder
  app.use(express.static(path.join(__dirname,'public')));
//declaring routes
  app.use('/',index);
app.use('/auth',auth);
app.use('/discuss',discussion);
  const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
});