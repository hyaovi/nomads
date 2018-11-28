const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";

  if (!Validator.isLength(data.handle, { min: 3, max: 40 })) {
    errors.handle = "handle must be between 3 and 30 characters";
  }
  if (isEmpty(data.handle)) {
    errors.handle = "Profile handle is required";
  }
  if (isEmpty(data.status)) {
    errors.status = "Status field  is required";
  }
  /* if (isEmpty(data.skills)) {
    errors.skills = "Skills field is required";
}*/
  if (!isEmpty(data.website && Validator.isURL(data.website))) {
    errors.website = "Not a valid URL";
  }
  if (!isEmpty(data.youtube && Validator.isURL(data.youtube))) {
    errors.youtube = "Not a valid URL";
  }
  if (!isEmpty(data.twitter && Validator.isURL(data.twitter))) {
    errors.twitter = "Not a valid URL";
  }
  if (!isEmpty(data.facebook && Validator.isURL(data.facebook))) {
    errors.facebook = "Not a valid URL";
  }
  if (!isEmpty(data.instagram && Validator.isURL(data.instagram))) {
    errors.instagram = "Not a valid URL";
  }
  if (!isEmpty(data.linkedin && Validator.isURL(data.linkedin))) {
    errors.linkedin = "Not a valid URL";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
