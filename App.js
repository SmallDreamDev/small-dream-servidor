let express = require('express');
let bodyParser = require('body-parser');
let gestorBD = require("./src/modules/gestorBD.js");
let mongo = require('mongodb');
let validations = require("./src/modules/validations.js");
let factory = require("./src/modules/factory.js");
let crud = require("./src/modules/crud.js");

//Inicializacion variables
let app = express();
gestorBD.init(app, mongo);
factory.init(validations);
crud.init(gestorBD, factory);

//Uses
app.use(bodyParser.json());

//Routers

//Sets
app.set("port", 8080);
app.set('db', "mongodb://sdamin:suyx74zsMzW%@smalldream-shard-00-00.ipxdb.mongodb.net:27017,smalldream-shard-00-01.ipxdb.mongodb.net:27017,smalldream-shard-00-02.ipxdb.mongodb.net:27017/smalldream?ssl=true&replicaSet=atlas-in3ped-shard-0&authSource=admin&retryWrites=true&w=majority");

//Routes
// require("./src/routes/rClients.js")(app, crud);
require("./src/routes/rEntityCrud.js")(app, crud, "activities");
require("./src/routes/rEntityCrud.js")(app, crud, "categories");
require("./src/routes/rEntityCrud.js")(app, crud, "clients");
require("./src/routes/rEntityCrud.js")(app, crud, "instructors");
require("./src/routes/rEntityCrud.js")(app, crud, "materials");
require("./src/routes/rEntityCrud.js")(app, crud, "programmes");
require("./src/routes/rEntityCrud.js")(app, crud, "schedules");
require("./src/routes/rEntityCrud.js")(app, crud, "users");
require("./src/routes/rEntityCrud.js")(app, crud, "workshops");

//Listeners
app.listen(app.get("port"), function () {
    console.log("Servidor activo");
    console.log("Puerto: " + app.get("port"));
});