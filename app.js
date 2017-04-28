const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

//Connect to Database
mongoose.connect(config.database);


// On Connection
mongoose.connection.on('connected', () => {
	console.log('Connected to DB');
});


//On Error
mongoose.connection.on('error', (err) => {
	console.log('Database Error: ' + err);
});

const app = express();

//CORS Middleware
app.use(cors());

// Body Parser Middleware
app.use(bodyParser.json());

const users = require('./routes/users');

//PORT Number
const port = process.env.PORT || 8080;


//SET Static Folder
app.use(express.static(path.join(__dirname,'public')));




//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);


//INDEX Route
app.get('/', (req, res) => {
	res.send('Invalid Endpoint');
});

app.get('/*', (req, res) => {
	res.send('404 Not Found!');
});

//Start Server
app.listen(port, () => {
	console.log('Server Started on Port: ' + port);
});