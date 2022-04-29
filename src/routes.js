const db = require("../src/models");
const User = db.user;

const user = require("../src/controllers/user.controller.js");
const login = require("../src/controllers/login.controller.js");
const book = require("../src/controllers/book.controller.js");

const secret = require("../configs/secret.config");
const jwt = require('jsonwebtoken');

var router = require("express").Router();
module.exports = app => {
    router.use((req, res, next) => {
        let token = req.headers.authorization
        let status = (req.url.startsWith("/login") || req.url.startsWith("/register")) ? true : false

        if (!status) {
            if (token.length > 0) {
                const verified = jwt.verify(token, secret.JWT_SECRET);
                if (verified) {
                    User.findOne({ where: { token: token } })
                        .then(user => {
                            user = user.dataValues
                            console.log(user)
                        }).catch(err => {
                            res.status(401).send({
                                type: "token_expire",
                                title: "Warning",
                                message: "Your session has been terminated, please login again.",
                            });
                        });
                }
            }
        }
        next()
    })

    //login
    router.post("/login", login.login);

    //User
    router.post("/register", user.create);
    router.get("/user/:id", user.findOne);

    //book
    router.get("/book/search", book.search);

    app.use('/api', router);
};