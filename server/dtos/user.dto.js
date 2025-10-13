module.exports = class UserDto {
  id;
  email;
  isVerifed;
  twoFactorEnabled;
  twoFactorSecret;

  constructor(model) {
    this.id = model._id;
    this.email = model.email;
    this.isVerifed = model.isVerifed;
    this.twoFactorEnabled = model.twoFactorEnabled;
  }
};
