function resolveRequestError(errorMsg, res, errorCode) {
    res.status(errorCode);
    res.json({
        errors: [errorMsg],
        authenticated: false
    });
}

module.exports = function (app, gestorBD, schemas) {

    app.post("/usuario/identificarse", function (req, res) {
        let credentials = req.body;
        let { error, value } = schemas.userLoginSchema.validate(credentials);
        if (error) {
            resolveRequestError("Esa combinación de usuario y contraseña no es correcta", res, 401);
        } else {
            let cypheredPassword = app.get("crypto").createHmac("sha256", app.get("secret_key"))
                .update(value.clave).digest("hex");
            let criteria = {
                "nombre_usuario": value.nombre_usuario,
                "clave": cypheredPassword
            };
            gestorBD.getEntityCollection(criteria, function (users) {
                if (users === null) {
                    resolveRequestError("Ha habido un error al intentar iniciar sesión", res, 500);
                } else {
                    if (users.length === 0) {
                        resolveRequestError("Esa combinación de usuario y contraseña no es correcta", res, 401);
                    } else {
                        let token = app.get("jwt").sign({
                            user: criteria.nombre_usuario,
                            time: Date.now() / 1000
                        }, app.get("token_secret"));
                        res.status(200);
                        res.json({
                            authenticated: true,
                            token: token
                        });
                    }
                }
            });
        }
    });

    app.get("/usuario/salir", function (req, res) {
    });

};
