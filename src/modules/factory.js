module.exports = {
    validations: null,
    init: function (validations) {
        this.validations = validations;
    },
    createClient(requestBody, functionCallback) {
        let clientToValidate = {
            nombre_completo: requestBody.nombre_completo,
            dni: requestBody.dni,
            contacto: requestBody.contacto,
            fecha_nacimiento: requestBody.fecha_nacimiento,
        }
        this.validations.checkValidClient(clientToValidate, function (client) {
            functionCallback(client);
        });
    },
    createActivity(requestBody, functionCallback) {
        let activityToValidate = {
            nombre: requestBody.nombre,
            zona: requestBody.zona
        }
        this.validations.checkValidActivity(activityToValidate, function (activity) {
            functionCallback(activity);
        });
    },
    createCategory(requestBody, functionCallback) {
        let categoryToValidate = {
            nombre: requestBody.nombre,
            zona: requestBody.zona
        }
        this.validations.checkValidCategory(categoryToValidate, function (category) {
            functionCallback(category);
        });
    },
    createInstructor(requestBody, functionCallback) {
        let instructorToValidate = {
            nombre_completo: requestBody.nombre_completo,
            dni: requestBody.dni,
            contacto: requestBody.contacto
        }
        this.validations.checkValidInstructor(instructorToValidate, function (instructor) {
            functionCallback(instructor);
        });
    },
    createMaterial(requestBody, functionCallback) {
        let materialToValidate = {
            precio: requestBody.precio,
            descripcion: requestBody.descripcion
        }
        this.validations.checkValidMaterial(materialToValidate, function (material) {
            functionCallback(material);
        });
    },
    createSchedule(requestBody, functionCallback) {
        let scheduleToValidate = {
            hora_inicio: requestBody.hora_inicio,
            hora_fin: requestBody.hora_fin,
            id_actividad: requestBody.id_actividad,
            id_monitor: requestBody.id_monitor,
            fecha: requestBody.fecha
        }
        this.validations.checkValidSchedule(scheduleToValidate, function (schedule) {
            functionCallback(schedule);
        });
    },
    createWorkshop(requestBody, functionCallback) {
        let workshopToValidate = {
            id_monitor: requestBody.id_monitor,
            id_actividad: requestBody.id_actividad,
            fecha: requestBody.fecha,
            plazas: requestBody.plazas,
            id_modo_pago: requestBody.id_modo_pago
        }
        this.validations.checkValidWorkshop(workshopToValidate, function (workshop) {
            functionCallback(workshop);
        });
    }
}