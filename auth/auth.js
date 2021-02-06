const jwt = require('jsonwebtoken');
module.exports = (req,res,next) => {
    if(req.cookies.auth == undefined){
        res.redirect('/login');
    }else{
        try{
            var decoded = jwt.verify(req.cookies.auth,'jedel');
            next();
        }catch(err){
            res.clearCookie('auth').clearCookie('id');
            res.redirect('/login');
        }
    }
}