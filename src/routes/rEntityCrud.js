function isIdValid(id, res) {
    if (!id) {
        res.status(400);
        res.json({
            errors: "El id proporcionado no es válido"
        });
    }
    return id && true;
}

module.exports = function (app, crud, collectionName) {

    app.get(`/${collectionName}/list`, function (req, res) {
        let criteria = {};
        crud.listCollection(collectionName, criteria, function (entityList) {
            if (entityList === null) {
                res.status(500);
                res.json({
                    error: `No se han podido obtener las entidades solicitadas desde "${collectionName}"`
                });
            } else {
                res.status(200);
                res.json({
                    entityList: JSON.stringify(entityList)
                });
            }
        });
    });

    app.get(`/${collectionName}/:id`, function (req, res) {
        let entityId = req.params.id;
        if (isIdValid(entityId)) {
            crud.getInstance(collectionName, entityId, function (entityData) {
                if (entityData === null) {
                    res.status(500);
                    res.json({
                        error: `No se han podido obtener los datos de la entidad solicitada desde "${collectionName}"`
                    });
                } else {
                    res.status(200);
                    res.json({
                        entityData: JSON.stringify(entityData)
                    });
                }
            });
        }
    });

    app.post(`/${collectionName}/create`, function (req, res) {
        crud.createEntity(collectionName, req.body, function (entityId) {
            if (entityId === null) {
                res.status(500);
                res.json({
                    error: `No se ha podido crear la entidad proporcionada en "${collectionName}"`
                });
            } else {
                res.status(201);
                res.json({
                    entityId: JSON.stringify(entityId)
                });
            }
        });
    });

    app.post(`/${collectionName}/update/:id`, function (req, res) {
        let entityId = req.params.id;
        if (isIdValid(entityId)) {
            crud.updateEntity(collectionName, entityId, req.body, function () {

            });
        }
    });

    app.post(`/${collectionName}/delete/:id`, function (req, res) {
        let entityId = req.params.id;
        if (isIdValid(entityId)) {
            crud.deleteEntity(collectionName, entityId, function () {

            });
        }
    });

};