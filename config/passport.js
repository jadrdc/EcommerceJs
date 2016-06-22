var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy();

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


passport.use('local-strategy',
new LocalStrategy({
usernameField :"email",
passwordField : "password",
passReqToCallback : true
}),function (req,email,password,done) {
User.findOne({email:email},function(err,user){

if(err) return done(err);

if(!user){
  done(null,false,req.flash("loginMessage","No use has been found"));
}

if (!user.comparePassword(password)) {

    done(null,false,req.flash("loginMessage","Wrong password pal"));
}
return done(null,user);

})
});


exports.isAuthenticaded=function(req,res,next)
{
  if(req.isisAuthenticaded())
  {
    return next();
  }
  else {

    res.redirect("/login");
  }

}
