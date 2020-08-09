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
        switch (collectionName) {
            case "activities": this.factory.createActivity(requestBody, this.factoryCallbackFunction("actividades", callbackFunction)); break;
            case "categories": this.factory.createCategory(requestBody, this.factoryCallbackFunction("categorias", callbackFunction)); break;
            case "clients": this.factory.createClient(requestBody, this.factoryCallbackFunction("clientes", callbackFunction)); break;
            case "instructors": this.factory.createInstructor(requestBody, this.factoryCallbackFunction("monitores", callbackFunction)); break;
            case "materials": this.factory.createMaterial(requestBody, this.factoryCallbackFunction("materiales", callbackFunction)); break;
            case "programmes": this.factory.createProgram(requestBody, this.factoryCallbackFunction("programas", callbackFunction)); break;
            case "schedules": this.factory.createSchedule(requestBody, this.factoryCallbackFunction("horarios", callbackFunction)); break;
            case "users": this.factory.createUser(requestBody, this.factoryCallbackFunction("usuarios", callbackFunction)); break;
            case "workshops": this.factory.createWorkshop(requestBody, this.factoryCallbackFunction("talleres", callbackFunction)); break;
        }
    },
    factoryCallbackFunction: function (collectionName, callbackFunction1) {
        return function (newEntity, callbackFunction = callbackFunction1) {
            if (newEntity === null) {
                callbackFunction(null);
            } else {
                this.gestorBD.insertEntity(collectionName, newEntity, function (id) {
                    callbackFunction(id);
                });
            }
        }
    }
};