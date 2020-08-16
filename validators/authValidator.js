const Joi = require('@hapi/joi');

const schema = Joi.object({
  firstName: Joi.string().min(2).max(50).trim().required(),
  lastName: Joi.string().min(2).max(50).trim().required(),
  mobileNumber: Joi.string().min(10).max(11).trim().required(),
  password: Joi.string().min(6).max(50).trim().required(),
});

validateRegistration = (reqBody) => {
  return schema.validate(reqBody);
};

module.exports = validateRegistration;
