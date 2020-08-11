module.exports = {
    checkValidClient(clientToValidate, functionCallback){
        let { nombre_completo, dni, contacto, fecha_nacimiento } = clientToValidate;

        if(nombre_completo === undefined || nombre_completo === null || nombre_completo.trim().length == 0
        || dni === undefined || dni === null || dni.trim().length == 0
        || contacto === undefined || contacto === null || contacto.trim().length == 0
        || fecha_nacimiento === undefined || fecha_nacimiento === null || fecha_nacimiento.trim().length == 0){
            functionCallback(null);
        }

        functionCallback(clientToValidate);
    },
    checkValidActivity(activityToValidate, functionCallback){
        let { nombre, zona } = activityToValidate;

        if(nombre === undefined || nombre === null || nombre.trim().length == 0
        || zona === undefined || zona === null || zona.trim().length == 0){
            functionCallback(null);
        }

        functionCallback(activityToValidate);
    },
    checkValidCategory(categoryToValidate, functionCallback){
        let { nombre } = categoryToValidate;

        if(nombre === undefined || nombre === null || nombre.trim().length == 0){
            functionCallback(null);
        }

        functionCallback(categoryToValidate);
    },
    checkValidInstructor(instructorToValidate, functionCallback){
        let { nombre_completo, dni, contacto } = instructorToValidate;

        if(nombre_completo === undefined || nombre_completo === null || nombre_completo.trim().length == 0
        || dni === undefined || dni === null || dni.trim().length == 0
        || contacto === undefined || contacto === null || contacto.trim().length == 0){
            functionCallback(null);
        }

        functionCallback(instructorToValidate);
    },
    checkValidMaterial(materialToValidate, functionCallback){
        let { precio, descripcion } = materialToValidate;

        if(precio === undefined || precio === null || precio.trim().length == 0
        || descripcion === undefined || descripcion === null || descripcion.trim().length == 0){
            functionCallback(null);
        }

        functionCallback(materialToValidate);
    },
    checkValidSchedule(scheduleToValidate, functionCallback){
        let { hora_inicio, hora_fin, id_actividad, id_monitor, fecha } = scheduleToValidate;

        if(hora_inicio === undefined || hora_inicio === null || hora_inicio.trim().length == 0
        || hora_fin === undefined || hora_fin === null || hora_fin.trim().length == 0
        || id_actividad === undefined || id_actividad === null || id_actividad.trim().length == 0
        || id_monitor === undefined || id_monitor === null || id_monitor.trim().length == 0
        || fecha === undefined || fecha === null || fecha.trim().length == 0){
            functionCallback(null);
        }

        functionCallback(scheduleToValidate);
    },
    checkValidWorkshop(workshopToValidate, functionCallback){
        let { id_monitor, id_actividad, fecha, plazas, id_modo_pago } = workshopToValidate;

        if(id_monitor === undefined || id_monitor === null || id_monitor.trim().length == 0
        || id_actividad === undefined || id_actividad === null || id_actividad.trim().length == 0
        || fecha === undefined || fecha === null || fecha.trim().length == 0
        || plazas === undefined || plazas === null || plazas.trim().length == 0
        || id_modo_pago === undefined || id_modo_pago === null || id_modo_pago.trim().length == 0){
            functionCallback(null);
        }

        functionCallback(workshopToValidate);
    }
}