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
app.set("db", "mongodb://sdadmin:5mAnammfatNoxO2J@smalldream-shard-00-00.ipxdb.mongodb.net:27017,smalldream-shard-00-01.ipxdb.mongodb.net:27017,smalldream-shard-00-02.ipxdb.mongodb.net:27017/smalldream?ssl=true&replicaSet=atlas-in3ped-shard-0&authSource=admin&retryWrites=true&w=majority");

//Routes
// require("./src/routes/rClients.js")(app, crud);
require("./src/routes/rEntityCrud.js")(app, crud, "actividades");
require("./src/routes/rEntityCrud.js")(app, crud, "categorias");
require("./src/routes/rEntityCrud.js")(app, crud, "clientes");
require("./src/routes/rEntityCrud.js")(app, crud, "monitores");
require("./src/routes/rEntityCrud.js")(app, crud, "materiales");
require("./src/routes/rEntityCrud.js")(app, crud, "programas");
require("./src/routes/rEntityCrud.js")(app, crud, "horarios");
require("./src/routes/rEntityCrud.js")(app, crud, "usuarios");
require("./src/routes/rEntityCrud.js")(app, crud, "talleres");

//Listeners
app.listen(app.get("port"), function () {
    console.log("Servidor activo");
    console.log("Puerto: " + app.get("port"));
});