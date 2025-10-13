module.exports = class BaseError extends Error {
  errors;
  status;

  constructor(status, errors = [], message) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static BadRequest(message, errors = []) {
    return new BaseError(400, message, errors);
  }

  static Unauthorized() {
    return new BaseError(401, "Unauthorized");
  }
};
