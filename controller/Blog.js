const dbBlog = require('../model/Blog');
const dbUser = require('../model/User');
const vBlog = require('../validator/Blog');
const jwt = require('jsonwebtoken');
const Gindex = (req,res) => {
    // const post = [
    //     {title:"Machine Learning",description:"Machine Learning is good text",author:"anish"},
    //     {title:"Data ad",description:"Asdfasdfsdf asd sd sdfasd",author:"aman"},
    //     {title:"sdfsd jhsdhjsdffk ",description:"asdfsdfsd fdsaf asd fsds",author:"emran"}
    // ]
    const id = jwt.verify(req.cookies.auth,'jedel');
    dbUser.findById(id.data,(err,Udata) => {
        dbBlog.find({},(err,Bdata) => {
            if(err){
                console.log(err);
                return;
            }
            res.cookie('auth',req.cookies.auth).cookie('id',id.data).render('index',{title:"macona",posts:Bdata,userdata:Udata});
        })
    })
    
}

const Pindex = async(req,res) => {
    if(req.body.title && req.body.description){
       dbUser.findById(req.cookies.id,(err,data) => {
           const savingUser = new dbBlog({title:req.body.title,description:req.body.description,author:data.username});
           savingUser.save().then(data => res.redirect('/')).catch(err => {
               console.log(err);
               return;
           })
       })
    }else{
        res.redirect('/');
    }
}
const userPage = (req,res) => {
    console.log(req.params.id);
    if(req.cookies.id){
        dbUser.findById(req.params.id,(err,data) => {
            console.log
            if(err) return;
            res.render('userPage',{title:"macona",userdata:data});
        })
    }else{
        res.redirect('/');
    }
}
const Delete = (req,res) => {
    dbBlog.findByIdAndDelete(req.params.id).then(data => res.redirect("/")).catch(err => console.log(err));
}

const logout = (req,res) => {
    res.clearCookie('auth').clearCookie('id');
    res.redirect('/');
}
module.exports = {
    Gindex,
    Pindex,
    Delete,
    userPage,
    logout,
}