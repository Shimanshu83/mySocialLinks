var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const session = require('express-session');
var passport = require('passport');
const MongoStore =  require('connect-mongo');
// const methodOverride = require('method-override');


var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
const {connectDB} = require('./database/connection');
const {connection} = require('./database/connection');
const { application } = require('express');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//override the method 
// app.use(methodOverride('_method'))
// dotenv
require("dotenv").config(); 

//connecting the database   
connectDB();    

/**
 * -------------- SESSION SETUP ----------------
 */

//  const sessionStore = new MongoStore({mongooseConnection : connection , collections : 'sessions'});
 app.use(session({
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost/mysociallinks' }),
     secret : process.env.SALT,
     resave : false ,
     saveUninitialized : true , 
     cookie :{
       maxAge : 1000*60*10 *24 *456 //Equals 1 day (1 day * 24 hr/1 day )
     }
   }));


/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */
 require('./config/passport');
 app.use(passport.initialize());
 app.use(passport.session());
 
 

app.use('/', indexRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(3030) ;

