var express = require("express");
require('dotenv').config()

var path = require("path");

const { request } = require("http");
const { response } = require("express");
const req = require("express/lib/request");
const port = 4000;
const { pool } = require("./dbConfig");
var bodyParser = require("body-parser");
var app = express();
//use gives the frontend-data (name,pw,mail) to the backend
//urlencoded encodes the url, all non alphabetic signs get readable
var urlencodedParser = bodyParser.urlencoded({ extended: false });
//3. setup template engine
app.set('views', 'views');
app.set("view engine", "pug");

//TO GET BODY INFROMATION INTO NAME MAIL PW PW2:
// create application/json parser
// var jsonParser = bodyParser.json() NOT NEEDED?!
app.use(bodyParser.json());//express should use the bodyparser
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })



//Startseite
app.get("/", (request, response) => {
    response.render("index");
});

app.get("/users/login", (request, response) => {
    response.render("login");
});

app.get("/users/dashboard", (request, response) => {
    response.render("dashboard", {user:"motherfucker"});
});

app.get("/users/register", (request, response) => {
    response.render("register");
});

// //REGISTER
app.post("/users/register", urlencodedParser, (request, response) => {
    let{ name, email, password, password2 } = request.body;
    // console.log({
    //     name,
    //     email,
    //     password,
    //     password2
    // });

    var errors = [];
    if(!name || !email ||!password ||!password2){
        errors.push({message: "Please fill all fields buddy!"})
    }

    if(password != password2){
        errors.push({message: "Passwords are not the same buddy!"})
    }

    if(errors.length > 0){
        response.render("register", {errors: errors});
    }

});

app.listen(port, () => {
    console.log(`server listening on ${port}`); 
});
