const express = require('express');
const morgan  = require('morgan');
const routes = require('./routes/Blog');
const authRouter = require('./routes/auth');
const mongoose = require('mongoose');
const cookieParse = require('cookie-parser');

//Initizating the dotenv and server
const app = express();
require('dotenv').config();
app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}));
app.use(cookieParse());
app.set('view engine','ejs');
app.set('views','public/html');
app.use(express.static('public/static'));
app.use(authRouter);
app.use(routes);


//firing up the server
mongoose.connect("mongodb+srv://anish:anish@macona.0mm8x.mongodb.net/macona?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true} , () => {
    app.listen(process.env.port, () => {
        console.log(`DataBase connected and server is on at ${process.env.port}`);
    });
});