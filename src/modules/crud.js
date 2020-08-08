module.exports = {
    gestorBD: null,
    factory: null,
    init: function (gestorBD, factory) {
        this.gestorBD = gestorBD;
        this.factory = factory;
    },
    listCollection: function (collectionName, criteria, functionCallback) {
        this.gestorBD.getEntityCollection(collectionName, criteria, function (collectionList) {
            functionCallback(collectionList);
        });
    },
    getInstance: function (collectionName, id, functionCallback) {
        this.gestorBD.getEntityById(collectionName, id, function (instance) {
            functionCallback(instance);
        });
    },
    createClient: function (requestBody, functionCallback) {
        this.factory.createClient(requestBody, function (client) {
            if (client === null) {
                functionCallback(null);
            } else {
                this.gestorBD.insertEntity("clientes", client, function (id) {
                    functionCallback(id);
                });
            }
        })
    },
    createActivity: function (requestBody, functionCallback) {
        this.factory.createActivity(requestBody, function (activity) {
            if (activity === null) {
                functionCallback(null);
            } else {
                this.gestorBD.insertEntity("actividades", activity, function (id) {
                    functionCallback(id);
                });
            }
        });
    },
    createCategory: function (requestBody, functionCallback) {
        this.factory.createCategory(requestBody, function (category) {
            if (category === null) {
                functionCallback(null);
            } else {
                this.gestorBD.insertEntity("categorias", category, function (id) {
                    functionCallback(id);
                });
            }
        });
    },
    createInstructor: function (requestBody, functionCallback) {
        this.factory.createActivity(requestBody, function (instructor) {
            if (instructor === null) {
                functionCallback(null);
            } else {
                this.gestorBD.insertEntity("monitores", instructor, function (id) {
                    functionCallback(id);
                });
            }
        });
    },
    createMaterial: function (requestBody, functionCallback) {
        this.factory.createActivity(requestBody, function (material) {
            if (material === null) {
                functionCallback(null);
            } else {
                this.gestorBD.insertEntity("materiales", material, function (id) {
                    functionCallback(id);
                });
            }
        });
    },
    createCategory: function (requestBody, functionCallback) {
        this.factory.createActivity(requestBody, function (category) {
            if (category === null) {
                functionCallback(null);
            } else {
                this.gestorBD.insertEntity("categorias", category, function (id) {
                    functionCallback(id);
                });
            }
        });
    },
    createProgram: function (requestBody, functionCallback) {
        this.factory.createActivity(requestBody, function (program) {
            if (program === null) {
                functionCallback(null);
            } else {
                this.gestorBD.insertEntity("programas", program, function (id) {
                    functionCallback(id);
                });
            }
        });
    },
    createSchedule: function (requestBody, functionCallback) {
        this.factory.createActivity(requestBody, function (schedule) {
            if (schedule === null) {
                functionCallback(null);
            } else {
                this.gestorBD.insertEntity("horarios", schedule, function (id) {
                    functionCallback(id);
                });
            }
        });
    },
    createWorkshop: function (requestBody, functionCallback) {
        this.factory.createActivity(requestBody, function (workshop) {
            if (workshop === null) {
                functionCallback(null);
            } else {
                this.gestorBD.insertEntity("talleres", workshop, function (id) {
                    functionCallback(id);
                });
            }
        });
    }
};