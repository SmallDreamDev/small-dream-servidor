module.exports = function (app, gestorBD) {

    app.post("/usuario/registrarse", function (req, res) {
        let { nombre_usuario, clave } = req.body;
        let cypheredPassword = app.get("crypto").createHmac("sha256", app.get("secret_key"))
            .update(clave).digest("hex");
        let user = {
            "nombre_usuario": nombre_usuario,
            "clave": cypheredPassword
        };
        gestorBD.insertEntity("usuarios", user, function (id) {
            if (id === null) {
                resolveRequestError("Ha habido un error al registrarse", res, 500);
            } else {
                let token = app.get("jwt").sign({
                    user: user.nombre_usuario,
                    time: Date.now() / 1000
                }, app.get("token_secret"));
                res.status(200);
                res.json({
                    authenticated: true,
                    token: token,
                    entityId: id
                });
            }
        });
        
    });

};
