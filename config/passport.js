var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy;
var User=require('../models/user');
/*Se llama con cada Post*/
passport.serializeUser(function(user,done)
{
  done(null,user_id);
});

/*Se llama con cada Get*/
passport.deserializeUser(function(id,done)
{
  User.findById(id,function(err,user)
{
  done(err,user);
});
});


passport.use('local-login',
new LocalStrategy({
usernameField :"email",
passwordField : "password",
passReqToCallback : true
},function (req,email,password,done) {
User.findOne({email:email},function(err,user){

if(err) return done(err);

if(!user){
  done(null,false);
}

if (!user.comparePassword(password)) {

  done(null,false);

}

return done(null,user);

})
}));


exports.isAuthenticaded=function(req,res,next)
{
  if(req.isAuthenticaded())
  {
    return next();
  }
  else {

    res.redirect("/login");
  }

}
