const Joi = require('@hapi/joi');

const profileSchema = Joi.object({
  newProfile: Joi.object({
    firstName: Joi.string().min(2).max(50).trim(),
    lastName: Joi.string().min(2).max(50).trim(),
    mobileNumber: Joi.string().min(10).max(11).trim(),
    password: Joi.string().min(6).max(50).trim(),
  }).required(),
  socials: Joi.object({
    facebook: Joi.string().trim(),
    twitter: Joi.string().trim(),
    instagram: Joi.string().trim(),
    linkedIn: Joi.string().trim(),
    github: Joi.string().trim(),
    stackOverflow: Joi.string().trim(),
    website: Joi.string().trim(),
  }).required(),
});

validateProfile = (reqBody) => profileSchema.validate(reqBody);

module.exports = validateProfile;
