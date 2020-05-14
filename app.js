const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/keys');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

// app Init
const app = express();

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');


// Passport config
require('./config/passport')(passport);


// Body Parser
app.use(express.urlencoded({ extended: false }));


// Express Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// Passport middlwere
app.use(passport.initialize());
app.use(passport.session());



// Connect flash
app.use(flash());



// Global Vars 
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});


// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));









const PORT = process.env.PORT || 10000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));