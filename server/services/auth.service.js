const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");
const mailService = require("./mail.service");
const tokenService = require("./token.service");
const deviceModel = require("../models/device.model");
const UserDto = require("../dtos/user.dto");
const DeviceDto = require("../dtos/device.dto");
const BaseError = require("../errors/base.error");

class AuthService {
  async login(email) {
    await mailService.sendOtp(email);
    return { email };
  }

  async verify(email, otp, req) {
    const result = await mailService.verifyOtp(email, otp);
    if (!result) {
      throw BaseError.BadRequest("Invalid OTP");
    }

    let user = await userModel.findOne({ email });
    if (!user) {
      user = await userModel.create({ email, isVerified: true });
    } else {
      user.isVerified = true;
      await user.save();
    }

    const sessions = await deviceModel.find({ user: user._id });

    if (sessions.length >= 3) {
      const oldSession = await deviceModel
        .findOne({ user: user._id })
        .sort({ lastUsedAt: 1 });
      if (oldSession) await deviceModel.findByIdAndDelete(oldSession._id);
    }

    const tokens = tokenService.generateToken(user._id);
    const refreshTokenHash = await bcrypt.hash(tokens.refreshToken, 10);
    const newSession = await deviceModel.create({
      user: user._id,
      deviceName: req.body.deviceName || "Unknown device",
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"],
      refreshTokenHash,
    });

    const userDto = new UserDto(user);
    const deviceDto = new DeviceDto(newSession);
    return { user: userDto, device: deviceDto, ...tokens };
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw BaseError.BadRequest("Bad authorization");
    }
    const { userId } = tokenService.validateRefreshToken(refreshToken);
    if (!userId) throw BaseError.BadRequest("Invalid token");
    const sessions = await deviceModel.find({ user: userId });
    let validSession = null;
    for (const s of sessions) {
      const isMatch = await bcrypt.compare(refreshToken, s.refreshTokenHash);
      if (isMatch) {
        validSession = s;
        break;
      }
    }

    if (!validSession) throw BaseError.BadRequest("Bad authorization");

    const user = validSession.user;
    if (!user) throw BaseError.BadRequest("User not found");
    const userDto = new UserDto(user);

    const tokens = tokenService.generateToken(userDto.id);
    const refreshTokenHash = await bcrypt.hash(tokens.refreshToken, 10);
    await deviceModel.findByIdAndUpdate(validSession._id, {
      refreshTokenHash,
      lastUsedAt: new Date(),
    });
    return { validSession, ...tokens };
  }

  async addTwoFactorAuth(userId, password) {
    const user = await userModel.findById(userId);
    if (!user) {
      throw BaseError.BadRequest("User is not found");
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

  async logoutOne(deviceId, userId) {
    await deviceModel.findOneAndDelete({ _id: deviceId, user: userId });
  }

  async logoutAll(userId) {
    await deviceModel.deleteMany({ user: userId });
  }

  async forgotPassword(email) {
    if (!email) throw BaseError.BadRequest("Email is required");
    const user = await userModel.findOne({ email });
    if (!user) {
      throw BaseError.BaseError("User not found");
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken(userDto.id);
    await mailService.sendRecoveryUrl(
      email,
      `${process.env.CLIENT_URL}/recovery-account/${tokens.accessToken}`
    );
  }

  async recoveryAccount(token, password) {
    if (!token) {
      throw BaseError.BadRequest("Something went wrong with token");
    }
    const userId = tokenService.validateAccessToken(token);
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

module.exports = new AuthService();
