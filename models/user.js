var mongose=require("mongoose");
var bcrypt= require("bcrypt-nodejs");
var Schema=mongose.Schema;




  var UserSchema= new Schema
  (      {
    email :{type:String,unique:true,lowercase:true},
    password : String,
    profile :
    { name :{type :String, default : ''}, picture  :{type :String, default : ''} }, adress:String,

     history : [{date : Date , paid :{ type :Number,default :0}}]


   });


  UserSchema.pre('save',function(next){
    var user=this;

    if(!user.isModified())return next();

    bcrypt.genSalt(10,function(err,salt)
    {

      if(err) return next();
      bcrypt.hash(user.password,salt,null,function(err,hash)
      {

        if(err) return next(err);
        user.password=hash;
        next();
      })
    });});

    UserSchema.methods.comparePassword=function()
    {return bcrypt.compareSync(password,this.password)};


    module.exports=mongose.model('User',UserSchema);
