const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./src/models");

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

db.sequelize.sync();

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Hello Dear!" });
});

require("./src/routes")(app);

app.use((err, req, res, next) => {
    if (err == "JsonWebTokenError: invalid token") {
        res.status(401).send({
            type: "token_expire",
            title: "Warning",
            message: "Your session has been terminated, please login again.",
        })
    }
    else {
        res.status(404).send({
            type: "Eror",
            title: "Eror",
            message: "Not Working!",
        })
    }
})

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});