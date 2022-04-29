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
            type: "warning",
            title: "Warning",
            message: "All fields are required.!"
        });
        return;
    }

    const pass = crypto.createHmac('sha256', secret.HASH_SECRET).update(user.pass).digest('hex');
    var condition = { email: user.email, pass: pass }
    User.findOne({ where: condition })
        .then(user => {
            user = user.dataValues
            let userInfo = {
                id: user.id,
                email: user.email,
                name: user.name,
            };

            let token = jwt.sign({ userInfo }, secret.JWT_SECRET, {
                expiresIn: secret.JWT_EXPIRES_IN,
            });

            User.update({ token: token, update: dayjs().toDate() }, {
                where: { id: user.id }
            }).then(data => {

                if (data == 1) {
                    res.send({
                        ...userInfo,
                        token: token
                    });
                } else {
                    res.err({
                        type: "eror",
                        title: "Error",
                        message: `Error updating User`
                    });
                }
                
            }).catch(err => {
                res.status(500).send({
                    type: "eror",
                    title: "Error",
                    message: "Error updating User"
                });
            });

        }).catch(err => {
            res.status(500).send({
                type: "warning",
                title: "Warning",
                message: "Email or password is incorrect!"
            });
        });
};
