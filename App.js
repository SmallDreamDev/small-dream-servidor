let express = require("express");
let bodyParser = require("body-parser");
let gestorBD = require("./src/modules/gestorBD.js");
let mongo = require("mongodb");

//Load environment variables
require("dotenv").config()

//Variables initialization
let app = express();
gestorBD.init(app, mongo);

//Uses
app.use(bodyParser.json());

//Routers

//Sets
app.set("port", 8080);
app.set("db", process.env.MONGODB_URI);

//Routes

//Listeners
app.listen(app.get("port"), function () {
    console.log("Servidor activo");
    console.log("Puerto: " + app.get("port"));
});