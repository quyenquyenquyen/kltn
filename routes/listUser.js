const express = require('express');
const listUserRouter = express.Router();
const passport = require('passport');
const User = require('../models/User');
const Todo = require('../models/Todo')
const ListUser = require('../models/ListUser')
const cors = require('cors')

listUserRouter.use(cors())


listUserRouter.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {

    const { username } = req.user
    ListUser.find().exec((err, docs) => {
        if (err)
            return res.status(400).send(err);
        res.send(docs)
    });
})


listUserRouter.delete('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    ListUser.remove((err, docs) => {
        if (!err) {
            console.log('delete all listuser')
        } else {
            console.log('Error while deleting a record: ' + JSON.stringify(err, undefined, 2));
        }
    })
})

module.exports = listUserRouter