let stringSubschema = this.joi.string()
    .max(100)
    .required();
let dniSubschema = this.joi.string()
    .pattern(/(([x-z]|[X-Z]{1})([-]?)(\d{7})([-]?)([a-z]|[A-Z]{1}))|((\d{8})([-]?)([a-z]|[A-Z]{1}))/)
    .required();
let activityDate = this.joi.date()
    .format("DD/MM/YYYY")
    .raw()
    .greater("1-1-1900")
    .less("now")
    .required();
let timeSchema = this.joi.string()
    .pattern(/^(([0-1]{1}[0-9]{1})|([2]{1}[0-3]{1})):(([0-5]{1}[0-9]{1}))$/)
    .required();

module.exports = {
    joi: null,
    init: function (joi) {
        this.joi = joi;
    },
    clientSchema: this.joi.object({
        nombre_completo: stringSubschema,
        dni: dniSubschema,
        contacto: stringSubschema,
        fecha_nacimiento: this.joi.date()
            .format("DD/MM/YYYY")
            .raw()
            .greater("1-1-1900")
            .less("now")
            .required()
    }),
    activitySchema: this.joi.object({
        nombre: stringSubschema,
        zona: this.joi.string()
            .pattern(/[a-zA-Z]/)
            .max(1)
            .required()
    }),
    categorySchema: this.joi.object({
        nombre: stringSubschema
    }),
    instructorSchema: this.joi.object({
        nombre_completo: stringSubschema,
        dni: dniSubschema,
        contacto: stringSubschema
    }),
    materialSchema: this.joi.object({
        precio: this.joi.number()
            .min(0)
            .required(),
        descripcion: stringSubschema
    }),
    scheduleSchema: this.joi.object({
        hora_inicio: timeSchema,
        hora_fin: timeSchema,
        id_actividad: this.joi.string(),
        id_monitor: this.joi.string(),
        fecha: activityDate
    }),
    workshopSchema: this.joi.object({
        fecha: activityDate,
        plazas: this.joi.number()
            .min(1)
            .required()
    })
};