module.exports = app => {
    const user = require("../src/controllers/user.controller.js");
    const login = require("../src/controllers/login.controller.js");

    var router = require("express").Router();

    //login
    router.post("/login", login.login);

    //User
    router.get("/user", user.findAll);
    router.post("/user", user.create);
    router.get("/user/:id", user.findOne);
    router.put("/user/:id", user.update);
    router.delete("/user/:id", user.delete);

    app.use('/api', router);
};