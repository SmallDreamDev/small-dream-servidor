let express = require("express");
let bodyParser = require("body-parser");
let gestorBD = require("./src/modules/gestorBD.js");
let mongo = require("mongodb");
let validations = require("./src/modules/validations.js");
let factory = require("./src/modules/factory.js");
let crud = require("./src/modules/crud.js");

//Load environment variables
require("dotenv").config();

//Variables initialization
let app = express();
gestorBD.init(app, mongo);
factory.init(validations);
crud.init(gestorBD, factory);

//Uses
app.use(bodyParser.json());

//Routers

//Sets
app.set("port", 8080);
app.set("db", process.env.MONGODB_URI);

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