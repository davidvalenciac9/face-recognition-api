const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profileid = require('./controllers/profileid');
const image = require('./controllers/image');
app.use(cors());
app.use(bodyParser.json()); 

//DATABASE CONNECTION WITH KNEX
const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'gartner',
    database : 'face-recognition'
  }
});

db.select('*').from('users').then(data => {
	//console.log(data);
});

app.get('/', (req,res) => {
	res.send(database.users);
})

//We pass the request and the response to a new function in controllers file
//And we pass the bcrypt and db variables
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) });
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });
app.get('/profile/:id', (req, res) => { profileid.handleProfileid(req, res, db) });

//I can just calle the handleImage function with db parameter and request and response
//Will be automatic called after - I could do that on all routes
// I have to nest the parameters on the controllers file!!!
app.put('/image', image.handleImage(db));
app.post('/imageurl', (req, res) => { image.handleApiCall (req, res) });

//START SERVER
app.listen(3000, ()=> {
	console.log('Server Started');
})