const joi = require('joi')

const validador = (req, res, next) =>{
   const esquema = joi.object({
        name: joi.string().trim().min(2).max(20).required().pattern(new RegExp('[a-zA-Z]$')),
        lastName: joi.string().trim().min(2).max(20).required().pattern(new RegExp('[a-zA-Z]$')),
        email: joi.string().trim().required().email(),
        password: joi.string().trim().min(6).required().pattern(new RegExp('[a-zA-Z0-9]$')),
        photoUser: joi.string().trim().required(),
        country: joi.required()
    })
 
    const validacion = esquema.validate(req.body, {abortEarly: false})
 
    if(validacion.error){
        return res.json({success: false, errores: validacion.error })
    }
    next()
 }
 
 module.exports = validador