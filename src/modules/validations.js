module.exports = {
    checkValidClient(clientToValidate, functionCallback){
        let { nombre_completo, dni, contacto, fecha_nacimiento } = clientToValidate;

        if(nombre_completo === undefined || nombre_completo === null || nombre_completo.trim().length == 0
        || contacto === undefined || dni === null || dni.trim().length == 0
        || contacto === undefined || contacto === null || contacto.trim().length == 0
        || fecha_nacimiento === undefined || fecha_nacimiento === null || fecha_nacimiento.trim().length == 0){
            functionCallback(null);
        }

        functionCallback(clientToValidate);
    }
}