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

app.use((req, res, next) => {
    console.log('Time:', Date.now())
    next()
  })

require("./src/routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});