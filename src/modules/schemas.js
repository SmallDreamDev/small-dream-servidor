let joi = require("joi").extend(require("@hapi/joi-date"));

let stringSubschema = joi.string()
    .max(100)
    .required();
let dniSubschema = joi.string()
    .pattern(/(([x-z]|[X-Z]{1})([-]?)(\d{7})([-]?)([a-z]|[A-Z]{1}))|((\d{8})([-]?)([a-z]|[A-Z]{1}))/)
    .required();
let activityDate = joi.date()
    .format("DD/MM/YYYY")
    .raw()
    .greater("1-1-1900")
    .less("now")
    .required();
let timeSchema = joi.string()
    .pattern(/^(([0-1]{1}[0-9]{1})|([2]{1}[0-3]{1})):(([0-5]{1}[0-9]{1}))$/)
    .required();

module.exports = {
    clientSchema: joi.object({
        nombre_completo: stringSubschema,
        dni: dniSubschema,
        contacto: stringSubschema,
        fecha_nacimiento: joi.date()
            .format("DD/MM/YYYY")
            .raw()
            .greater("1-1-1900")
            .less("now")
            .required()
    }),
    activitySchema: joi.object({
        nombre: stringSubschema,
        zona: joi.string()
            .pattern(/[a-zA-Z]/)
            .max(1)
            .required()
    }),
    categorySchema: joi.object({
        nombre: stringSubschema
    }),
    instructorSchema: joi.object({
        nombre_completo: stringSubschema,
        dni: dniSubschema,
        contacto: stringSubschema
    }),
    materialSchema: joi.object({
        precio: joi.number()
            .min(0)
            .required(),
        descripcion: stringSubschema
    }),
    scheduleSchema: joi.object({
        hora_inicio: timeSchema,
        hora_fin: timeSchema,
        id_actividad: joi.string(),
        id_monitor: joi.string(),
        fecha: activityDate
    }),
    workshopSchema: joi.object({
        fecha: activityDate,
        plazas: joi.number()
            .min(1)
            .required()
    }),
    userLoginSchema: joi.object({
        nombre_usuario: stringSubschema,
        clave: stringSubschema
    })
};