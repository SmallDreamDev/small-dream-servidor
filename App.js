let express = require('express');
let bodyParser = require('body-parser');
let gestorBD = require("./src/modules/gestorBD.js");
let mongo = require('mongodb');

//Inicializacion variables
let app = express();
gestorBD.init(app,mongo);

//Uses
app.use(bodyParser.json());

//Routers

//Sets
app.set("port", 8080);
app.set('db', "mongodb://sdamin:suyx74zsMzW%@smalldream-shard-00-00.ipxdb.mongodb.net:27017,smalldream-shard-00-01.ipxdb.mongodb.net:27017,smalldream-shard-00-02.ipxdb.mongodb.net:27017/smalldream?ssl=true&replicaSet=atlas-in3ped-shard-0&authSource=admin&retryWrites=true&w=majority");


//Routes
require("./src/routes/r.js")(app, gestorBD);

//Listeners
app.listen(app.get("port"), function(){
    console.log("Servidor activo");
 });