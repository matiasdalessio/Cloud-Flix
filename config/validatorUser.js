const joi = require('joi')

const validatorUser = (req, res, next) => {
    const schema = joi.object({
        email: joi.string().required().trim().email({tlds:{allow:false}}).messages({
            "any.required": "Your Email is a required field",
            "string.email": "Your Email must be a valid mail",
        }),
        password: joi.string().min(6).trim().required().pattern(/(?=.*\d)(?=.*[A-z])/).messages({
            "string.empty": "Your Password  is a required field",
            "string.min": "Your Password  must have at least 6 characters",
            "string.pattern.base": "Your Password must have at least a letter and a number",
        }),
        country: joi.string().trim().required().messages({
            "string.empty": "Your country is a required field",
        }),
        premium: joi.boolean(),
        loggedWithGoogle: joi.boolean()
    })
    const validation = schema.validate(req.body, {abortEarly: true})
    if (validation.error) {
        return res.json({success: false, error: validation.error.details[0]})
    }
    next()
}

module.exports = validatorUser