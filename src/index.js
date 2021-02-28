var express = require("express");
var bodyParser = require("body-parser");
var mongoose =require('mongoose');
var BooksModel = require('./books');
var UsersModel = require('./users');
var myApp = express();
var path = require("path");
var lisport =3000;
var isLogin = false;
myApp.use(bodyParser.urlencoded({extended: false}))
myApp.use(express.static("public"));
myApp.use("/images",express.static(__dirname+"Images"));
myApp.use("/scripts",express.static(__dirname+"Scripts"));
myApp.use("/styles",express.static(__dirname+"Styles"));
myApp.set('views', path.join(__dirname, 'views') );
myApp.set("view engine", "ejs")
myApp.use(express.static(__dirname + '/views'))

//Db Connection Start
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/bookstore', { useNewUrlParser: true})
    .then(() => console.log('connection successful'))
    .catch((err) => console.error(err))
//Db Connection End

myApp.get("/",(req,res)=>{
    //res.render("index",{TEST: "Just a simple"})
    BooksModel.find(function (err,books){
        if(err){
            console.log(err);
        } else {
            res.render('index',{books: books,SuccessLogin: false});
        }
        //console.log(__dirname);
    });
})

myApp.get("/login",(req,res)=>{
    //res.render('login');
    res.render('login', {SuccessLogin: false});
});

myApp.post("/login",(req, res)=>{
    UsersModel.find(function (err, users)
    {
            BooksModel.find(function (err, books) {
                if ((req.body.Username != users[0].Username) || (req.body.Password != users[0].Password)) {
                    res.render("login", { SuccessLogin: false});
                } else {
                    res.render("index", { books: books,SuccessLogin: true});
                    isLogin=true;
                }
            });
    });
})
myApp.get("/home", (req, res) => {
    UsersModel.find(function (err, users)
    {
        BooksModel.find(function (err,books){
            if (isLogin==false) {
                res.render('index',{books: books,SuccessLogin: false});
            } else {
                res.render('index',{books: books,SuccessLogin: true});
            }
        });
    });
})

myApp.get("/aboutus", (req, res) => {
    UsersModel.find(function (err, users)
    {
        if (isLogin==false) {
            res.render("aboutus", { SuccessLogin: false});
        } else {
            res.render("aboutus", { SuccessLogin: true});
        }
    });
})

myApp.get("/teams", (req, res) => {
    UsersModel.find(function (err, users)
    {
        if (isLogin==false) {
            res.render("teams", { SuccessLogin: false});
        } else {
            res.render("teams", { SuccessLogin: true});
        }
    });
})

myApp.get("/contact", (req, res) => {
    UsersModel.find(function (err, users)
    {
        if (isLogin==false) {
            res.render("contact", { SuccessLogin: false});
        } else {
            res.render("contact", { SuccessLogin: true});
        }
    });
})

myApp.listen(lisport,(req,res)=>console.log("Server is running"))