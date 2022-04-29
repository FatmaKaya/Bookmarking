module.exports = app => {
    const user = require("../src/controllers/user.controller.js");
    const login = require("../src/controllers/login.controller.js");
    const book = require("../src/controllers/book.controller.js");

    var router = require("express").Router();

    //login
    router.post("/login", login.login);

    //User
    router.post("/user", user.create);
    router.get("/user/:id", user.findOne);

    //book
    router.get("/book/search", book.search);

    app.use('/api', router);
};