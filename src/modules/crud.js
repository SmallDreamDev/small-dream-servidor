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
        id = this.gestorBD.mongo.ObjectID(id);
        this.gestorBD.getEntityById(collectionName, id, function (instance) {
            callbackFunction(instance);
        });
    },
    getInstanceDetails: function (collectionName, id, callbackFunction) {
        let _this = this;
        this.getInstance(collectionName, id, function (instance) {
            switch (collectionName) {
                case "actividades": _this.getDetailsActivity(instance, callbackFunction); break;
                case "categorias": _this.getDetailsCategory(instance, callbackFunction); break;
                case "clientes": _this.getDetailsClient(instance, callbackFunction); break;
                case "monitores": _this.getDetailsInstructor(instance, callbackFunction); break;
                case "materiales": _this.getDetailsMaterial(instance, callbackFunction); break;
                case "talleres": _this.getDetailsWorkshop(instance, callbackFunction); break;
                default: break;
            }
        });
    },
    createEntity: function (collectionName, requestBody, callbackFunction) {
        let _gestorBD = this.gestorBD;
        let callback = function (newEntity) {
            if (newEntity === null) {
                callbackFunction(null);
            } else {
                _gestorBD.insertEntity(collectionName, newEntity, function (id) {
                    callbackFunction(id.str);
                });
            }
        };

        switch (collectionName) {
            case "actividades": this.factory.createActivity(requestBody, callback); break;
            case "categorias": this.factory.createCategory(requestBody, callback); break;
            case "clientes": this.factory.createClient(requestBody, callback); break;
            case "monitores": this.factory.createInstructor(requestBody, callback); break;
            case "materiales": this.factory.createMaterial(requestBody, callback); break;
            case "talleres": this.factory.createWorkshop(requestBody, callback); break;
            case "modosDePago": this.factory.createPaymentMethod(requestBody, callback); break;
            case "perteneceA": this.factory.createRelationshipActivityCategory(requestBody, callback); break;
            case "usa": this.factory.createRelationshipActivityMaterial(requestBody, callback); break;
            case "apuntado": this.factory.createRelationshipClientToWorkshop(requestBody, callback); break;
            case "usuarios": this.gestorBD.insertEntity(requestBody, function (id) {
                callbackFunction(id.str);
            });
            default: break;
        }
    },
    updateEntity: function (collectionName, entityId, requestBody, callbackFunction) {
        let entity = requestBody.entity;
        let criteria = { _id: this.gestorBD.mongo.ObjectID(entityId) };
        let _gestorBD = this.gestorBD;
        let callback = function (error) {
            if (error) {
                callbackFunction(null, error);
            } else {
                _gestorBD.updateEntity(collectionName, criteria, entity, function (result) {
                    callbackFunction(result, error);
                });
            }
        };
        switch (collectionName) {
            case "actividades": this.factory.updateActivity(entity, callback); break;
            case "categorias": this.factory.updateCategory(entity, callback); break;
            case "clientes": this.factory.updateClient(entity, callback); break;
            case "monitores": this.factory.updateInstructor(entity, callback); break;
            case "materiales": this.factory.updateMaterial(entity, callback); break;
            case "talleres": this.factory.updateWorkshop(entity, callback); break;
            default: break;
        }
    },
    deleteEntity: function (collectionName, entityId, callbackFunction) {
        let criteria = { _id: this.gestorBD.mongo.ObjectID(entityId) };
        this.gestorBD.deleteEntity(collectionName, criteria, function (result) {
            callbackFunction(result);
        });
    },
    getDetailsActivity(activity, callbackFunction) {
        let categoryIds = activity.categorias ? activity.categorias : [];
        let materialIds = activity.materiales ? activity.materiales : [];
        let categoryCriteria = { "_id": { $in: categoryIds } };
        let materialCriteria = { "_id": { $in: materialIds } };
        let _this = this;
        if (categoryIds.length > 0) {
            this.listCollection("categorias", categoryCriteria, function (categoryList) {
                activity.categorias = categoryList;
                if (materialIds.length > 0) {
                    _this.listCollection("materiales", materialCriteria, function (materialList) {
                        activity.materiales = materialList;
                        callbackFunction(activity);
                    });
                } else {
                    activity.materiales = [];
                    callbackFunction(activity);
                }
            });
        } else if (materialIds.length > 0) {
            this.listCollection("materiales", materialCriteria, function (materialList) {
                activity.categorias = [];
                activity.materiales = materialList;
                callbackFunction(activity);
            });
        } else {
            activity.categorias = [];
            activity.materiales = [];
            callbackFunction(activity);
        }
    },
    getDetailsCategory(category, callbackFunction) {
        let activityIds = category.actividades ? category.actividades : [];
        let criteria = { "_id": { $in: activityIds } };
        if (activityIds.length > 0) {
            this.listCollection("actividades", criteria, function (activityList) {
                category.actividades = activityList;
                callbackFunction(category);
            });
        } else {
            category.actividades = [];
            callbackFunction(category);
        }
    },
    getDetailsClient(client, callbackFunction) {
        let workshopIds = client.talleres ? client.talleres : [];
        let workshopCriteria = { "_id": { $in: workshopIds } };
        let _this = this;
        if (workshopIds.length > 0) {
            this.listCollection("talleres", workshopCriteria, function (workshopList) {
                let activityIds = [];
                workshopList.forEach(function (w) {
                    activityIds.push(w.id_actividad);
                });
                let activityCriteria = { "_id": { $in: activityIds } };
                _this.listCollection("actividades", activityCriteria, function (activityList) {
                    workshopList.forEach(function (w) {
                        activityList.forEach(function (a) {
                            if (w.id_actividad.equals(a._id)) {
                                w.actividad = a;
                                return;
                            }
                        });
                    });
                    client.talleres = workshopList;
                    callbackFunction(client);
                });

            });
        } else {
            client.talleres = [];
            callbackFunction(client);
        }
    },
    getDetailsInstructor(instructor, callbackFunction) {
        callbackFunction(instructor);
    },
    getDetailsMaterial(material, callbackFunction) {
        let activityIds = material.actividades ? material.actividades : [];
        let criteria = { "_id": { $in: activityIds } };
        if (activityIds.length > 0) {
            this.listCollection("actividades", criteria, function (activityList) {
                material.actividades = activityList;
                callbackFunction(material);
            });
        } else {
            material.actividades = [];
            callbackFunction(material);
        }
    },
    getDetailsWorkshop(workshop, callbackFunction) {
        let _this = this;
        this.getInstance("actividades", workshop.id_actividad, function (activity) {
            workshop.actividad = activity;
            _this.getInstance("monitores", workshop.id_monitor, function (instructor) {
                workshop.monitor = instructor;
                let clientIds = workshop.clientes ? workshop.clientes : [];
                let criteria = { "_id": { $in: clientIds } };
                if (clientIds.length > 0) {
                    _this.listCollection("clientes", criteria, function (clientList) {
                        workshop.clientes = clientList;
                        callbackFunction(workshop);
                    });
                } else {
                    workshop.clientes = [];
                    callbackFunction(workshop);
                }
            })
        });
    }
};