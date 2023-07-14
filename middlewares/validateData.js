const { HttpError } = require("../helpers");

const validateData = (schema) => {
  const func = (request, response, next) => {
    const { error } = schema.validate(request.body);
    if (error) {
      const errorMessage = error.details[0].message;
      next(HttpError(400, errorMessage));
    } else {
      next();
    }
  };
  return func;
};

module.exports = validateData;
