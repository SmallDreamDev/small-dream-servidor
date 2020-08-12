function isIdValid(id, res) {
    // If null, if undefined, if ""
    if (!id) {
        res.status(400);
        res.json({
            errors: "El id proporcionado no es válido"
        });
    }
    return id && true;
}

module.exports = function (app, crud, collectionName) {

    app.get(`/${collectionName}/listar`, function (req, res) {
        let criteria = {};
        crud.listCollection(collectionName, criteria, function (entityList) {
            if (entityList === null) {
                res.status(500);
                res.json({
                    error: `No se han podido obtener las entidades solicitadas desde ${collectionName}`
                });
            } else {
                res.status(200);
                res.json({
                    entityList: entityList
                });
            }
        });
    });

    app.get(`/${collectionName}/:id`, function (req, res) {
        let entityId = req.params.id;
        if (isIdValid(entityId, res)) {
            crud.getInstance(collectionName, entityId, function (entityData) {
                if (entityData === null) {
                    res.status(500);
                    res.json({
                        error: `No se han podido obtener los datos de la entidad solicitada desde ${collectionName}`
                    });
                } else {
                    res.status(200);
                    res.json({
                        entityData: entityData
                    });
                }
            });
        }
    });

    app.post(`/${collectionName}/crear`, function (req, res) {
        crud.createEntity(collectionName, req.body, function (entityId) {
            if (entityId === null) {
                res.status(500);
                res.json({
                    error: `No se ha podido crear la entidad proporcionada en ${collectionName}`
                });
            } else {
                res.status(201);
                res.json({
                    entityId: entityId
                });
            }
        });
    });

    app.post(`/${collectionName}/actualizar/:id`, function (req, res) {
        let entityId = req.params.id;
        if (isIdValid(entityId, res)) {
            crud.updateEntity(collectionName, entityId, req.body, function (result) {
                if (result === null){
                    res.status(500);
                    res.json({
                        error: `No se ha podido crear la entidad proporcionada en ${collectionName}`
                    });
                } else {
                    res.status(200);
                    res.json({
                        result: result
                    });
                }
            });
        }
    });

    app.post(`/${collectionName}/eliminar/:id`, function (req, res) {
        let entityId = req.params.id;
        if (isIdValid(entityId, res)) {
            crud.deleteEntity(collectionName, entityId, function () {

            });
        }
    });

};