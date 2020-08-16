const Joi = require('@hapi/joi');

const userSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).trim().required(),
  lastName: Joi.string().min(2).max(50).trim().required(),
  mobileNumber: Joi.string().min(10).max(11).trim().required(),
  password: Joi.string().min(6).max(50).trim().required(),
});

const loginSchema = Joi.object({
  mobileNumber: Joi.string().min(10).max(11).trim().required(),
  password: Joi.string().min(6).max(50).trim().required(),
});

validateRegistration = (reqBody) => userSchema.validate(reqBody);
validateLogin = (reqBody) => loginSchema.validate(reqBody);

module.exports.validateRegistration = validateRegistration;
module.exports.validateLogin = validateLogin;
