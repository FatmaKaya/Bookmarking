const db = require("../models");
const secret = require("../../configs/secret.config");
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');

const User = db.user;
const Op = db.Sequelize.Op;

exports.login = (req, res) => {
    let user = req.body;
    if (!user.email || !user.pass) {
        res.status(400).send({
            message: "All fields are required.!"
        });
        return;
    }

    let userInfo = {
        _id: user._id,
        email: user.email,
        name: user.name,
    };
    let token = jwt.sign(userInfo, secret.JWT_SECRET);

    const pass = crypto.createHmac('sha256', secret.HASH_SECRET).update(user.pass).digest('hex');
    
    user = {
        email:user.email,
        token:token,
        startToken: dayjs().toDate(),
        endToken:dayjs().add(30, 'day').toDate()
    }

    var condition = { email: user.email, pass: pass }
    User.update(user, {
        where: condition
    })
        .then(num => {
            if (num == 1) {
                res.send(user);
            } else {
                res.send({
                    message: `Email or password is incorrect!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with id=" + id
            });
        });

};
