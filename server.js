var express=require("express");
var morgan=require("morgan");
var app=express();
var mongoose=require('mongoose');
var bodyParser=require('body-parser');
var User = require('./models/user');
var ejs=require('ejs');
var ejsmate=require('ejs-mate');
var mainroutes=require('./routes/main');
var userroutes=require('./routes/user');
var secret=require('./config/secret');

var session=require('express-session');
var cookieParser=require('cookie-parser');
var flash=require('express-flash');


var MongoStore=require('connect-mongo/es5')(session);
var passport=require('passport');


app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.engine('ejs',ejsmate);
app.set('view engine','ejs');
app.use(express.static(__dirname+'/public'));
app.use(cookieParser());

app.use(
session({

  resave:true,
  saveUnitialized:true,
  secret:secret.secretkey,
  store:new MongoStore({url:secret.database,autoReconnect:true})
})

);
app.use(flash());



app.use(passport.initialize());
app.use(passport.session())

app.use(mainroutes);
app.use(userroutes);



mongoose.connect(secret.database,function(err)
{
	if (err)
  {
	   console.log('Not Connected');
	}else
  {
	  console.log('Connected');
	}});


app.listen(secret.port,function(err)
{
	if(err)throw err;
	console.log("The Server is Running");
});
