let express = require('express');
let bodyParser = require('body-parser');

//Inicializacion variables
let app = express();

//Uses
app.use(bodyParser.json());

//Routers

//Sets
app.set("port", 8080);

//Routes
require("./src/routes/rdata.js")(app);

//Listeners
app.listen(app.get("port"), function(){
    console.log("Servidor activo");
 });