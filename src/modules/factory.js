function validate(entityToValidate, schema, functionCallback) {
    let { error } = schema.validate(entityToValidate);
    functionCallback(error);
}

module.exports = {
    schemas: null,
    init: function (schemas) {
        this.schemas = schemas;
    },
    createActivity: function (requestBody, functionCallback) {
        let activityToValidate = {
            nombre: requestBody.nombre,
            zona: requestBody.zona
        };
        validate(activityToValidate, this.schemas.activitySchema, functionCallback);
    },
    createCategory: function (requestBody, functionCallback) {
        let categoryToValidate = {
            nombre: requestBody.nombre,
            zona: requestBody.zona
        };
        validate(categoryToValidate, this.schemas.categorySchema, functionCallback);
    },
    createClient: function (requestBody, functionCallback) {
        let clientToValidate = {
            nombre_completo: requestBody.nombre_completo,
            dni: requestBody.dni,
            contacto: requestBody.contacto,
            fecha_nacimiento: requestBody.fecha_nacimiento,
        };
        validate(clientToValidate, this.schemas.clientSchema, functionCallback);
    },
    createInstructor: function (requestBody, functionCallback) {
        let instructorToValidate = {
            nombre_completo: requestBody.nombre_completo,
            dni: requestBody.dni,
            contacto: requestBody.contacto
        };
        validate(instructorToValidate, this.schemas.instructorSchema, functionCallback);
    },
    createMaterial: function (requestBody, functionCallback) {
        let materialToValidate = {
            precio: requestBody.precio,
            descripcion: requestBody.descripcion
        };
        validate(materialToValidate, this.schemas.materialSchema, functionCallback);
    },
    createWorkshop: function (requestBody, functionCallback) {
        let workshopToValidate = {
            id_monitor: requestBody.id_monitor,
            id_actividad: requestBody.id_actividad,
            fecha: requestBody.fecha,
            hora_inicio: requestBody.hora_inicio,
            hora_fin: requestBody.hora_fin,
            plazas: requestBody.plazas,
            id_modo_pago: requestBody.id_modo_pago
        };
        validate(workshopToValidate, this.schemas.workshopSchema, functionCallback);
    },
    createPaymentMethod: function (requestBody, functionCallback) {
        let paymentMethod = {
            descripcion: requestBody.descripcion,
            valor: requestBody.valor
        };
        validate(paymentMethod, this.schemas.paymentMethodSchema, functionCallback);
    },
    createRelationshipActivityCategory: function (requestBody, functionCallback) {
        let activityToCategory = {
            id_actividad: requestBody.id_actividad,
            id_categoria: requestBody.id_categoria
        };
        validate(activityToCategory, this.schemas.activityToCategorySchema, functionCallback);
    },
    createRelationshipActivityMaterial: function (requestBody, functionCallback) {
        let activityToMaterial = {
            id_material: requestBody.id_material,
            id_actividad: requestBody.id_actividad,
            cantidad: requestBody.cantidad
        };
        validate(activityToMaterial, this.schemas.activityToMaterialSchema, functionCallback);
    },
    createRelationshipClientToWorkshop: function (requestBody, functionCallback) {
        let clientToWorkshop = {
            id_cliente: requestBody.id_cliente,
            id_monitor: requestBody.id_monitor,
            id_actividad: requestBody.id_actividad,
            hora_inicio: requestBody.hora_inicio,
            hora_fin: requestBody.hora_fin,
            fecha: requestBody.fecha
        };
        validate(clientToWorkshop, this.schemas.clientToWorkshopSchema, functionCallback);
    },
    updateActivity(activity, functionCallback) {
        validate(activity, this.schemas.activitySchema, functionCallback);
    },
    updateCategory(category, functionCallback) {
        validate(category, this.schemas.categorySchema, functionCallback);
    },
    updateClient(client, functionCallback) {
        validate(client, this.schemas.clientSchema, functionCallback);
    },
    updateInstructor(instructor, functionCallback) {
        validate(instructor, this.schemas.instructorSchema, functionCallback);
    },
    updateMaterial(material, functionCallback) {
        validate(material, this.schemas.materialSchema, functionCallback);
    },
    updateWorkshop(workshop, functionCallback) {
        validate(workshop, this.schemas.workshopSchema, functionCallback);
    }
};
