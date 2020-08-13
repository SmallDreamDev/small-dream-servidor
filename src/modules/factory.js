function validate(entityToValidate, schema, functionCallback){
    let { error, value } = schema.validate(entityToValidate);
    error ? functionCallback(null) : functionCallback(value);
}

module.exports = {
    schemas: null,
    init: function (schemas) {
        this.schemas = schemas;
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
    createSchedule: function (requestBody, functionCallback) {
        let scheduleToValidate = {
            hora_inicio: requestBody.hora_inicio,
            hora_fin: requestBody.hora_fin,
            id_actividad: requestBody.id_actividad,
            id_monitor: requestBody.id_monitor,
            fecha: requestBody.fecha
        };
        validate(scheduleToValidate, this.schemas.scheduleSchema, functionCallback);
    },
    createWorkshop: function (requestBody, functionCallback) {
        let workshopToValidate = {
            id_monitor: requestBody.id_monitor,
            id_actividad: requestBody.id_actividad,
            fecha: requestBody.fecha,
            plazas: requestBody.plazas,
            id_modo_pago: requestBody.id_modo_pago
        };
        validate(workshopToValidate, this.schemas.workshopSchema, functionCallback);
    }
};