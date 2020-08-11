const { call } = require("body-parser");

module.exports = {
    gestorBD: null,
    factory: null,
    init: function (gestorBD, factory) {
        this.gestorBD = gestorBD;
        this.factory = factory;
    },
    listCollection: function (collectionName, criteria, callbackFunction) {
        this.gestorBD.getEntityCollection(collectionName, criteria, function (collectionList) {
            callbackFunction(collectionList);
        });
    },
    getInstance: function (collectionName, id, callbackFunction) {
        this.gestorBD.getEntityById(collectionName, id, function (instance) {
            callbackFunction(instance);
        });
    },
    createEntity: function (collectionName, requestBody, callbackFunction) {
        let _gestorBD = this.gestorBD;
        let callback = function (newEntity) {
            if (newEntity === null) {
                callbackFunction(null);
            } else {
                _gestorBD.insertEntity(collectionName, newEntity, function (id) {
                    callbackFunction(id);
                });
            }
        };

        switch (collectionName) {
            case "actividades": this.factory.createActivity(requestBody, callback); break;
            case "categorias": this.factory.createCategory(requestBody, callback); break;
            case "clientes": this.factory.createClient(requestBody, callback); break;
            case "monitores": this.factory.createInstructor(requestBody, callback); break;
            case "materiales": this.factory.createMaterial(requestBody, callback); break;
            case "horarios": this.factory.createSchedule(requestBody, callback); break;
            case "talleres": this.factory.createWorkshop(requestBody, callback); break;
            default: break;
        }
    }
};