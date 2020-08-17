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

function responseFunction(response, result, errorStatusCode, errorMessage, successStatusCode, successJson) {
    if (result === null) {
        response.status(errorStatusCode);
        response.json({
            error: errorMessage
        });
    } else {
        response.status(successStatusCode);
        response.json(successJson);
    }
}

module.exports = function (app, crud, collectionName) {

    app.get(`/${collectionName}/listar`, function (req, res) {
        let criteria = {};
        crud.listCollection(collectionName, criteria, function (entityList) {
            responseFunction(res, entityList, 500, `No se han podido obtener las entidades solicitadas desde ${collectionName}`, 200, { entityList: entityList });
        });
    });

    app.get(`/${collectionName}/:id`, function (req, res) {
        let entityId = req.params.id;
        if (isIdValid(entityId, res)) {
            crud.getInstance(collectionName, entityId, function (entityData) {
                responseFunction(res, entityData, 500, `No se han podido obtener los datos de la entidad solicitada desde ${collectionName}`, 200, { entityData: entityData });
            });
        }
    });

    app.post(`/${collectionName}/crear`, function (req, res) {
        crud.createEntity(collectionName, req.body, function (entityId) {
            responseFunction(res, entityId, 500, `No se ha podido crear la entidad proporcionada en ${collectionName}`, 201, { entityId: entityId });
        });
    });

    app.post(`/${collectionName}/actualizar/:id`, function (req, res) {
        let entityId = req.params.id;
        if (isIdValid(entityId, res)) {
            crud.updateEntity(collectionName, entityId, req.body, function (result) {
                responseFunction(res, result, 500, `No se ha podido modificar la entidad proporcionada en ${collectionName}`, 200, { message: "modificado" });
            });
        }
    });

    app.get(`/${collectionName}/eliminar/:id`, function (req, res) {
        let entityId = req.params.id;
        if (isIdValid(entityId, res)) {
            crud.deleteEntity(collectionName, entityId, function (result) {
                responseFunction(res, result, 500, `No se ha podido eliminar la entidad proporcionada en ${collectionName}`, 200, { message: "eliminado" });
            });
        }
    });

};