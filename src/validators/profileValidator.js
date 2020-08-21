const Joi = require('@hapi/joi');

const SocialAccount = Joi.object({
  name: Joi.optional(),
  enabled: Joi.optional(),
});

const profileSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).trim(),
  lastName: Joi.string().min(2).max(50).trim(),
  mobileNumber: Joi.string().min(10).max(11).trim(),
  password: Joi.string().min(6).max(50).trim(),
  facebook: SocialAccount,
  twitter: SocialAccount,
  instagram: SocialAccount,
  linkedIn: SocialAccount,
  github: SocialAccount,
  stackOverflow: SocialAccount,
  website: SocialAccount,
  settings: Joi.object({ theme: Joi.string().trim() }),
});

validateProfile = (reqBody) => profileSchema.validate(reqBody);

module.exports = validateProfile;
