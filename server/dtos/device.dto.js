module.exports = class DeviceDto {
  id;
  user;
  deviceName;
  ipAddress;
  userAgent;
  lastUsedAt;
  createdAt;
  refreshTokenHash;

  constructor(model) {
    this.id = model._id;
    this.user = model.user;
    this.deviceName = model.deviceName;
    this.ipAddress = model.ipAddress;
    this.userAgent = model.userAgent;
    this.lastUsedAt = model.lastUsedAt;
    this.createdAt = model.createdAt;
    this.refreshTokenHash = model.refreshTokenHash;
  }
};
