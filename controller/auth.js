const vReg = require('../validator/Register');
const vLog = require('../validator/Login');
const dbUser = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const gLogin = (req,res) => {
    if(req.cookies.auth){
        res.redirect('/');
    }
    res.render('login',{title:"macona"});
}
const gRegister = (req,res) => {
    if(req.cookies.auth){
        res.redirect('/');
    }
    res.render('register',{title:"macona"})
}

const pRegister = async(req,res) => {
    if(req.body.username && req.body.email && req.body.password && req.body.name){
        try{
            const nouse = await vReg.validateAsync({username:req.body.username,name:req.body.name,password:req.body.password,email:req.body.email});
            dbUser.countDocuments({email:req.body.email},function(err,c){
                if(c > 0){
                    res.render('register',{title:"macona",warning:"You have created an email address Before"});
                }else{
                    dbUser.countDocuments({username:req.body.username},(err,c) => {
                        if(c > 0){
                            res.render('register',{title:"macona",warning:"This Username is selected before"});
                        }else{
                            const saveUser = new dbUser(req.body);
                            saveUser.save().then(data => {
                                res.cookie('auth',jwt.sign({data: data._id},'jedel',{ expiresIn: '1h' })).redirect('/');
                            }).catch(err => console.log(err));
                        }
                    })
                }

            })
        }catch(err){
            res.render('register',{title:"macona",warning:err.details[0].message});
        }

    }else{
        res.render('register',{title:"macona",warning:"Some Fields Are Missing"});
    }
}

const PLogin = async(req,res) => {
    if(req.body.username && req.body.password){
        try{
            const nouse = await vLog.validateAsync({username:req.body.username,password:req.body.password})
            dbUser.countDocuments({username:req.body.username},(err,count) => {
                if(count > 0){
                    dbUser.findOne({username:req.body.username},(err,data) => {
                        bcrypt.compare(req.body.password,data.password,(err,result) => {
                            if(result){
                                res.cookie('auth',jwt.sign({data: data._id},'jedel',{ expiresIn: '1h' })).redirect('/');
                            }else{
                                res.render('login',{title:"macona",warning:"NO !!!!"})
                            }
                        })
                    })
                }else{
                    res.render('login',{title:"macona",warning:"You are not from Here !"});
                }
            })
        }catch(err){
            res.render('login',{title:"macona",warning:err.details[0].message})
        }
        
    }else{
        res.render('login',{title:"macona",warning:"Something is Missing"})
    }
}
module.exports = {
    gLogin,
    gRegister,
    pRegister,
    PLogin
}