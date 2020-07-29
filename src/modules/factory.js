module.exports = {
    validations: null,
    init: function(validations){
        this.validations = validations;
    },
    createClient(requestBody, functionCallback){
        let clientToValidate = {
            nombre_completo: requestBody.nombre_completo,
            dni: requestBody.dni,
            contacto: requestBody.contacto,
            fecha_nacimiento: requestBody.fecha_nacimiento,
        }
        this.validations.checkValidClient(clientToValidate, function(client){
            functionCallback(client);
        });
    }
}