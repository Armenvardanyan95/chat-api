const { Message } = require('../models');
const decode = require('jwt-decode');

function getMessages (req, res) {
    Message.find({})
        .populate('author')
        .then(messages => res.json({messages}))
        .catch(e => res.json({message: e.message}));
}

function createMessage(req, res) {
    const { text } = req.body;
    const auth = req.headers['authorization'].split(' ')[1];
    const { _id }= decode(auth);
    const message = new Message({author: _id, text});
    message.save()
        .then(() => res.json({message: 'Message added'}))
        .catch(e => res.status(422).json({message: e.message}));
}

module.exports = { getMessages, createMessage };