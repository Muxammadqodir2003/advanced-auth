const bcrypt = require("bcrypt");
const BaseError = require("../errors/base.error");
const userModel = require("../models/user.model");
const UserDto = require("../dtos/user.dto");
const deviceModel = require("../models/device.model");
const DeviceDto = require("../dtos/device.dto");
const tokenService = require("./token.service");
const mailService = require("./mail.service");
const messageModel = require("../models/message.model");

class UserService {
  async getDevices(userId) {
    const devices = await deviceModel.find({ user: userId });
    return devices.map((item) => new DeviceDto(item));
  }

  async addTwoFactorAuth(userId, password) {
    const user = await userModel.findById(userId);
    if (!user) {
      throw BaseError.Unauthorized();
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.findByIdAndUpdate(
      userId,
      {
        twoFactorEnabled: true,
        twoFactorSecret: hashedPassword,
      },
      { new: true }
    );
    return 200;
  }

  async disableTwoAuth(userId, password) {
    const user = await userModel.findById(userId);
    if (!user) throw BaseError.Unauthorized();

    const isValid = await bcrypt.compare(password, user.twoFactorSecret);
    if (!isValid) throw BaseError.BadRequest("Password is incorrect");

    await userModel.findByIdAndUpdate(userId, {
      twoFactorEnabled: false,
      twoFactorSecret: null,
    });
  }

  async changePass(userId, oldPassword, password) {
    const user = await userModel.findById(userId);
    if (!userId || !user) throw BaseError.Unauthorized();
    console.log(user);
    const isValid = await bcrypt.compare(oldPassword, user.twoFactorSecret);
    if (!isValid) throw BaseError.BadRequest("Old password is incorrect");
    console.log(isValid);
    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.findByIdAndUpdate(user._id, {
      twoFactorSecret: hashedPassword,
    });
    return true;
  }

  async getMessages(userId) {
    const user = await userModel.findById(userId);
    if (!user || !userId) throw BaseError.Unauthorized();

    return await messageModel.find({ user });
  }

  async forgotPassword(email) {
    if (!email) throw BaseError.BadRequest("Email is required");
    const user = await userModel.findOne({ email });
    if (!user) {
      throw BaseError.BadRequest("User not found");
    }
    const userDto = new UserDto(user);
    const { accessToken } = tokenService.generateAccessToken(userDto.id);
    await mailService.sendRecoveryUrl(
      email,
      `${process.env.CLIENT_URL}/recovery-account/${accessToken}`
    );
  }

  async recoveryAccount(token, password) {
    if (!token) {
      throw BaseError.BadRequest("Something went wrong with token");
    }
    const { userId } = tokenService.validateAccessToken(token);
    if (!userId) {
      throw BaseError.BadRequest("Expired access to your account");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.findByIdAndUpdate(userId, {
      twoFactorSecret: hashedPassword,
    });
    return 200;
  }
}

module.exports = new UserService();
