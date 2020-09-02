let gestorBD = require("./src/modules/gestorBD.js");
let factory = require("./src/modules/factory.js");
let crud = require("./src/modules/crud.js");
let schemas = require("./src/modules/schemas.js");
let express = require("express");
let bodyParser = require("body-parser");
let mongo = require("mongodb");
let jwt = require("jsonwebtoken");
let crypto = require("crypto");

// Load environment variables
require("dotenv").config();

// Variables initialization
let app = express();
gestorBD.init(app, mongo);
factory.init(schemas);
crud.init(gestorBD, factory);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
    next();
});

// Uses
app.use(bodyParser.json());

// Routers
// -- Router user-token
let routerUserToken = express.Router();
routerUserToken.use(function (req, res, next) {
    let token = req.headers["token"] || req.body.token || req.query.token;
    if (token !== null) {
        jwt.verify(token, app.get("token_secret"), function (err, infoToken) {
            if (err || (Date.now() / 1000 - infoToken.time) > 240) {
                res.status(403);
                res.json({
                    acceso: false,
                    error: "El token de sesión proporcionado no es válido o ha caducado"
                });
            } else {
                req.user = infoToken.user;
                next();
            }
        });
    } else {
        res.status(403);
        res.json({
            acceso: false,
            mensaje: "No se ha encontrado un token de sesión válido en la petición"
        });
    }
});

// Sets
app.set("port", 8080);
app.set("jwt", jwt);
app.set("crypto", crypto);
app.set("db", process.env.MONGODB_URI);
app.set("secret_key", process.env.SECRET_KEY);
app.set("token_secret", process.env.TOKEN_SECRET);

// Routes
// -- Entities
require("./src/routes/rEntityCrud.js")(app, crud, "actividades");
require("./src/routes/rEntityCrud.js")(app, crud, "categorias");
require("./src/routes/rEntityCrud.js")(app, crud, "clientes");
require("./src/routes/rEntityCrud.js")(app, crud, "monitores");
require("./src/routes/rEntityCrud.js")(app, crud, "materiales");
require("./src/routes/rEntityCrud.js")(app, crud, "talleres");
require("./src/routes/rEntityCrud.js")(app, crud, "modosDePago");
require("./src/routes/rEntityCrud.js")(app, crud, "perteneceA");
require("./src/routes/rEntityCrud.js")(app, crud, "usa");
require("./src/routes/rEntityCrud.js")(app, crud, "apuntado");

// -- User management
require("./src/routes/rUserLogin.js")(app, gestorBD, schemas);
require("./src/routes/rUserSignup.js")(app, gestorBD);

// Apply routers to API endpoints
app.use("/actividades", routerUserToken);
app.use("/categorias", routerUserToken);
app.use("/clientes", routerUserToken);
app.use("/monitores", routerUserToken);
app.use("/materiales", routerUserToken);
app.use("/talleres", routerUserToken);
app.use("/modosDePago", routerUserToken);
app.use("/perteneceA", routerUserToken);
app.use("/usa", routerUserToken);
app.use("/apuntado", routerUserToken);
app.use("/usuario/salir", routerUserToken);

// Listeners
app.listen(app.get("port"), function () {
    console.log("Servidor activo");
    console.log("Puerto: " + app.get("port"));
});
