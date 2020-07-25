module.exports = function (app, gestorBD) {

    app.get("/clients/list", function (req, res) {
        let errors = [];
        let criteria = {}
        gestorBD.getClients(criteria, function (clientList) {
            if (clientList === null) {
                res.status(500);
                errors.push("No se han podido obtener los clientes")
                res.json({
                    error: JSON.stringify(errors)
                });
            } else {
                res.status(200);
                res.json({
                    clientList: JSON.stringify(clientList)
                })
            }
        });
    });

    app.get("/clients/:clientId", function (req, res) {
        let clientId = req.params.clientId;
        let errors = [];
        clientId = checkIfStringUndefined(
            clientId, errors, "No se ha incluído un id de cliente"
        );
        if (errors.length > 0) {
            res.status(400);
            res.json({
                errors: errors
            });
        } else {
            gestorBD.getClient(clientId, function (clientData) {
                if (clientData === null) {
                    res.status(500);
                    errors.push("No se han podido obtener los datos del cliente")
                    res.json({
                        error: JSON.stringify(errors)
                    });
                } else {
                    res.status(200);
                    res.json({
                        clientData: JSON.stringify(clientData)
                    })
                }
            });
        }
    });

    app.post("/clients/add", function (req, res) {
    });

};