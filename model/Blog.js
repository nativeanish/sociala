const mongoose = require('mongoose');

const blog = new mongoose.Schema({
    title:{
        type:String,
        requrired:true,
    },
    author:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
},{timestamps:true});

mongoose.pluralize(null);

module.exports = mongoose.model('blog',blog);