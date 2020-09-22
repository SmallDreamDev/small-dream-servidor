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

function validationResponseFunction(response, result, error, serverErrorMessage, successStatusCode, successJson) {
    if (error) {
        response.status(422);
        response.json({
            validationErrorMessage: error.message
        });
    } else {
        responseFunction(response, result, 500, serverErrorMessage, successStatusCode, successJson);
    }
}

module.exports = function (app, crud, collectionName) {

    app.get(`/${collectionName}/listar`, function (req, res) {
        let criteria = {};
        crud.listCollection(collectionName, criteria, function (entityList) {
            responseFunction(
                res,
                entityList,
                500,
                `No se han podido obtener las entidades solicitadas desde ${collectionName}`,
                200,
                { entityList }
            );
        });
    });

    app.post(`/${collectionName}/crear`, function (req, res) {
        crud.createEntity(collectionName, req.body, function (result, error) {
            validationResponseFunction(
                res,
                result,
                error,
                `No se ha podido crear la entidad proporcionada en ${collectionName}`,
                201,
                { result }
            );
        });
    });

    app.post(`/${collectionName}/actualizar`, function (req, res) {
        let entityId = req.body.entityId;
        if (isIdValid(entityId, res)) {
            crud.updateEntity(collectionName, entityId, req.body, function (result, error) {
                validationResponseFunction(
                    res,
                    result,
                    error,
                    `No se ha podido modificar la entidad proporcionada en ${collectionName}`,
                    200,
                    { message: "modificado" }
                );
            });
        }
    });

    app.post(`/${collectionName}/eliminar`, function (req, res) {
        let entityId = req.body.entityId;
        if (isIdValid(entityId, res)) {
            crud.deleteEntity(collectionName, entityId, function (result, error) {
                responseFunction(
                    res,
                    result,
                    500,
                    error,
                    200,
                    { message: "eliminado" }
                );
            });
        }
    });

    app.get(`/${collectionName}/:id`, function (req, res) {
        let entityId = req.params.id;
        if (isIdValid(entityId, res)) {
            crud.getInstance(collectionName, entityId, function (entityData) {
                responseFunction(
                    res,
                    entityData,
                    500,
                    `No se han podido obtener los datos de la entidad solicitada desde ${collectionName}`,
                    200,
                    { entityData }
                );
            });
        }
    });

    app.get(`/${collectionName}/detalles/:id`, function (req, res) {
        let entityId = req.params.id;
        if (isIdValid(entityId, res)) {
            crud.getInstanceDetails(collectionName, entityId, function (entityDetails) {
                responseFunction(
                    res,
                    entityDetails,
                    500,
                    `No se han podido obtener los detalles de la entidad solicitada desde ${collectionName}`,
                    200,
                    { entityDetails }
                );
            });
        }
    });

};