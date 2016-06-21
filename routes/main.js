

/*Main routing*/
 var router = require('express').Router();


 router.get('/',function(req,resp){
 	resp.render('main/home');
 });


 router.get('/about',function (req,res) {
 res.render('main/about');
 });


module.exports=router;
