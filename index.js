const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jwt-express');

const { UserController, MessagesController } = require('./controllers');

const app = express();

mongoose.connect('mongodb://localhost:27017/chat')
    .then(() => console.log('Connection To Mongo Established!'))
    .catch(e => console.log(e));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    // allow preflight
    if (req.method === 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(jwt.init('chat', {cookies: false}));


app.get('/', (req, res) => res.send('Chat API'));

app.post('/register', UserController.createUser);

app.post('/token', UserController.getToken);

app.get('/messages', jwt.valid(), MessagesController.getMessages);

app.post('/messages', jwt.valid(), MessagesController.createMessage);

app.listen(3000);