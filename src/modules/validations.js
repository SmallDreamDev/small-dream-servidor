module.exports = {
    joi : null,
    init : function(joi){
        this.joi = joi;
    },
    checkValidClient(clientToValidate, functionCallback){
        const schema = this.joi.object({
            nombre_completo : this.joi.string()
                        .max(30)
                        .required(),
            dni : this.joi.string()
                        .pattern(/(([x-z]|[X-Z]{1})([-]?)(\d{7})([-]?)([a-z]|[A-Z]{1}))|((\d{8})([-]?)([a-z]|[A-Z]{1}))/)
                        .required(),
            contacto : this.joi.string()
                        .required(),
            fecha_nacimiento : this.joi.date()
                        .format("DD/MM/YYYY")
                        .raw()
                        .greater("1-1-1900")
                        .less("now")
                        .required()                 
        });
        let { error, value } = schema.validate(clientToValidate);
        error ? functionCallback(null) : functionCallback(value);
    },
    checkValidActivity(activityToValidate, functionCallback){
        const schema = this.joi.object({
            nombre : this.joi.string()
                        .max(50)
                        .required(),
            zona : this.joi.string()
                        .pattern(/[a-zA-Z]/)
                        .max(1)
                        .required()
        });
        let { error, value } = schema.validate(activityToValidate);
        error ? functionCallback(null) : functionCallback(value);
    },
    checkValidCategory(categoryToValidate, functionCallback){
        const schema = this.joi.string()
                        .max(50)
                        .required();

        let { error, value } = schema.validate(categoryToValidate);
        error ? functionCallback(null) : functionCallback(value);
    },
    checkValidInstructor(instructorToValidate, functionCallback){
        const schema = this.joi.object({
            nombre_completo : this.joi.string()
                        .pattern(/^[a-z ,.'-]+$/i)
                        .max(30)
                        .required(),
            dni : this.joi.string()
                        .pattern(/(([x-z]|[X-Z]{1})([-]?)(\d{7})([-]?)([a-z]|[A-Z]{1}))|((\d{8})([-]?)([a-z]|[A-Z]{1}))/)
                        .required(),
            contacto : this.joi.string()
                        .required()
        });

        let { error, value } = schema.validate(instructorToValidate);
        error ? functionCallback(null) : functionCallback(value);
    },
    checkValidMaterial(materialToValidate, functionCallback){
        const schema = this.joi.object({
            precio : this.joi.number()
                        .min(0)
                        .required(),
            descripcion : this.joi.string()
                        .max(30)
                        .required()
        });

        let { error, value } = schema.validate(materialToValidate);
        error ? functionCallback(null) : functionCallback(value);
    },
    checkValidSchedule(scheduleToValidate, functionCallback){
        const schema = this.joi.object({
            hora_inicio : this.joi.string()
                        .pattern(/^(([0-1]{1}[0-9]{1})|([2]{1}[0-3]{1})):(([0-5]{1}[0-9]{1}))$/)
                        .required(),
            hora_fin : this.joi.string()
                        .pattern(/^(([0-1]{1}[0-9]{1})|([2]{1}[0-3]{1})):(([0-5]{1}[0-9]{1}))$/)
                        .required(),
            id_actividad: this.joi.string(),
            id_monitor: this.joi.string(),
            fecha : this.joi.date()
                        .format("DD/MM/YYYY")
                        .raw()
                        .greater("now")
                        .required()   
        });

        let { error, value } = schema.validate(scheduleToValidate);
        console.log(error);
        error ? functionCallback(null) : functionCallback(value);
    },
    checkValidWorkshop(workshopToValidate, functionCallback){
        const schema = this.joi.object({
            fecha : this.joi.date()
                        .format("DD/MM/YYYY")
                        .raw()
                        .greater("now")
                        .required(),
            plazas : this.joi.number()
                        .min(1)
                        .required()
        });

        let { error, value } = schema.validate(workshopToValidate);
        error ? functionCallback(null) : functionCallback(value);
    }
}