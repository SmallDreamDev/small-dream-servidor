let joi = require("joi").extend(require("@hapi/joi-date"));

let stringSubschema = joi.string()
    .max(100)
    .required();
let dniSubschema = joi.string()
    .pattern(/(([x-z]|[X-Z]{1})([-]?)(\d{7})([-]?)([a-z]|[A-Z]{1}))|((\d{8})([-]?)([a-z]|[A-Z]{1}))/)
    .required();
let dateSubschema = joi.date()
    .format("DD/MM/YYYY")
    .raw()
    .greater("1-1-1900")
    .less("now")
    .required();
let timeSubschema = joi.string()
    .pattern(/^(([0-1]{1}[0-9]{1})|([2]{1}[0-3]{1})):(([0-5]{1}[0-9]{1}))$/)
    .required();
let numberSubschema = joi.number()
    .min(0)
    .required();

module.exports = {
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
    clientSchema: joi.object({
        nombre_completo: stringSubschema,
        dni: dniSubschema,
        contacto: stringSubschema,
        fecha_nacimiento: dateSubschema
    }),
    instructorSchema: joi.object({
        nombre_completo: stringSubschema,
        dni: dniSubschema,
        contacto: stringSubschema
    }),
    materialSchema: joi.object({
        precio: numberSubschema,
        descripcion: stringSubschema
    }),
    workshopSchema: joi.object({
        id_modo_pago: stringSubschema,
        id_monitor: stringSubschema,
        id_actividad: stringSubschema,
        fecha: dateSubschema,
        hora_inicio: timeSubschema,
        hora_fin: timeSubschema,
        plazas: numberSubschema
    }),
    userLoginSchema: joi.object({
        nombre_usuario: stringSubschema,
        clave: stringSubschema
    }),
    paymentMethodSchema: joi.object({
        descripcion: stringSubschema,
        valor: numberSubschema
    }),
    activityToCategorySchema: joi.object({
        id_actividad: stringSubschema,
        id_categoria: stringSubschema
    }),
    activityToMaterialSchema: joi.object({
        id_material: stringSubschema,
        id_actividad: stringSubschema,
        cantidad: numberSubschema
    }),
    clientToWorkshopSchema: joi.object({
        id_cliente: stringSubschema,
        id_monitor: stringSubschema,
        id_actividad: stringSubschema,
        hora_inicio: timeSubschema,
        hora_fin: timeSubschema,
        fecha: dateSubschema
    })
};
