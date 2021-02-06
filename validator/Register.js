const joi = require('joi');

module.exports = joi.object({
    name:joi.string().min(5),
    email:joi.string().email(),
    password:joi.string().min(5),
    username:joi.string().min(4),
})