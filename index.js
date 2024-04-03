var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect('mongodb+srv://signup_form:signup_form@cluster0.waorzra.mongodb.net/Registration_Form');
var db = mongoose.connection;
db.on('error', () => console.log("Error in Connecting to Database"));
db.once('open', () => console.log("Connected to Database Successfully !"));

// Signup Route
app.post("/sign_up", (req, res) => {
    var name = req.body.name;
    var age = req.body.age;
    var email = req.body.email;
    var phno = req.body.phno;
    var gender = req.body.gender;
    var password = req.body.password;

    var data = {
        "name": name,
        "age": age,
        "email": email,
        "phno": phno,
        "gender": gender,
        "password": password
    };

    db.collection('users').insertOne(data, (err, collection) => {
        if (err) {
            throw err;
        }
        console.log("Record Inserted Succesfully !");
    });

    return res.redirect('index.html');
});

// Login Route
app.post("/login", (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    db.collection('users').findOne({ email: email, password: password }, (err, user) => {
        if (err) {
            throw err;
        }
        if (user) {
            console.log("Login Successful !");
            return res.redirect('success.html'); // Redirect to dashboard upon successful login
        } else {
            console.log("Invalid Email or Password");
            return res.redirect('fail.html'); // Redirect back to login page if credentials are incorrect
        }
    });
});

// Home Route
app.get("/", (req, res) => {
    res.set({
        "Allow-acces-Allow-Origin": '*'
    });
    return res.redirect('index.html');
});

app.listen(7000, () => {
    console.log("Listening on Port 7000");
});
