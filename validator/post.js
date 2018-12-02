const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";

  if (Validator.isEmpty(data.text)) {
    errors.text = "Text is required!";
  }
  if (
    !Validator.isEmpty(data.text) &&
    !Validator.isLength(data.text, { min: 10, max: 300 })
  ) {
    errors.text_length = "Text must be between 30 and 300 characters!";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
