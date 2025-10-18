module.exports = class UserDto {
  id;
  email;
  isVerified;
  twoFactorEnabled;
  twoFactorSecret;

  constructor(model) {
    this.id = model._id;
    this.email = model.email;
    this.isVerified = model.isVerified;
    this.twoFactorEnabled = model.twoFactorEnabled;
  }
};
