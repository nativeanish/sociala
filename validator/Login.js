const joi = require('joi');

module.exports = joi.object({
    password:joi.string().min(5),
    username:joi.string().min(4),
})