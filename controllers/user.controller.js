const { User } = require('../models');

function createUser(req, res) {
    const userInfo = req.body;
    const user = new User(userInfo);
    user.save()
        .then(() => res.json({message: 'User Successfully created'}))
        .catch(() => res.json({message: 'User Creation Failed'}));
}

function getToken(req, res) {
    const { email, password } = req.body;
    User.findOne({email, password})
        .then(user => {
            if (user) {
                const { fullName, _id } = user;
                const jwt = res.jwt({ fullName, _id });
                res.json({token: jwt.token});
            } else {
                res.status(404).json({message: 'User not found'})
            }
        })
        .catch(e => res.status(422).json({message: e.message}));
}

module.exports = { createUser, getToken };