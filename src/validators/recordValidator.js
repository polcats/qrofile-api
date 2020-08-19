const Joi = require('@hapi/joi');

const recordSchema = Joi.object({
  owner: Joi.string().required(),
  user: Joi.object({
    _id: Joi.string().required(),
  }).required(),
});

const deleteRecordSchema = Joi.object({
  id: Joi.string().required(),
  owner: Joi.string().required(),
});

validateRecord = (reqBody) => recordSchema.validate(reqBody);
validateDelete = (reqBody) => deleteRecordSchema.validate(reqBody);

module.exports.validateRecord = validateRecord;
module.exports.validateDelete = validateDelete;
