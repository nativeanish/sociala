const joi = require('joi');

module.exports = joi.object({
    username:joi.string().min(4),
    title:joi.string().min(4),
    description:joi.string().min(10),
});