const Joi = require('@hapi/joi')


const registerValidation = (data) => {
    const schema = Joi.object().keys({
    name: Joi.string().required(),
    password: Joi.string().min(8).required()
    });
    return Joi.assert(data,schema)
}

const loginValidation = (data) => {
    const schema = Joi.object().keys({
    name: Joi.string().required(),
    password: Joi.string()
    .min(8)
    .required()
    });
    return Joi.assert(data,schema)
}

module.exports = { registerValidation, loginValidation }