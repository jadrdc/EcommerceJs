var router = require('express').Router();
var User=require("../models/user");
var passport=require('passport');
var passportConf= require('../config/passport');

router.get("/login",function(req,res){
if (req.user) {
  res.redirect("/");
}
else {
  res.render("accounts/login",{message : req.flash("loginMessage")});

}

});

router.post("/login",passport.authenticate('local-login',{
  successRedirect: "/profile",
  failureRedirect : "/login"
}));



router.get('/signup',function (req,res,next) {
res.render('accounts/signup');
});



router.post('/signup',
function(req,resp,next){
var user = new User();
user.profile.name=req.body.name;
user.password=req.body.password;
user.email=req.body.email;
User.findOne({email:req.body.email},function(err,existingUser){
if(existingUser)
{

req.flash('errors','Account with that email already exists');
  return resp.redirect("/signup");
}
else {
  user.save();
  resp.redirect('/');


}
});

});


module.exports=router;