const express = require('express');
const router = express.Router();
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const expressEjsLayout = require('express-ejs-layouts')
const passport = require('passport');
require('dotenv').config()


require("./config/passport")(passport)
//mongoose
mongoose.connect(process.env.MONGO,{useNewUrlParser: true, useUnifiedTopology : true})
.then(() => console.log('connected,,'))
.catch((err)=> console.log(err));

//EJS
app.set('view engine','ejs');
app.use(expressEjsLayout);

//BodyParser
app.use(express.urlencoded({extended : false}));
app.use(session({
    secret : 'secret',
    resave : true,
    saveUninitialized : true
   }));
   app.use(passport.initialize());
    app.use(passport.session());

//use flash
   app.use(flash());
   app.use((req,res,next)=> {
     res.locals.success_msg = req.flash('success_msg');
     res.locals.error_msg = req.flash('error_msg');
     res.locals.error  = req.flash('error');
   next();
   })

//Routes
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));
app.use('/payment',require('./routes/payment'));

app.use(express.static(__dirname +'/public'))

app.listen(3000); 