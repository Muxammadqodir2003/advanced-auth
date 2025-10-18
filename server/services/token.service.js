const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const deviceModel = require("../models/device.model");
const tokenModel = require("../models/token.model");

class TokenService {
  generateToken(userId, deviceId) {
    const accessToken = jwt.sign(
      { userId, deviceId },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15m",
      }
    );
    const refreshToken = jwt.sign(
      { userId, deviceId },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "30d" }
    );

    return { accessToken, refreshToken };
  }

  generateAccessToken(userId) {
    try {
      const accessToken = jwt.sign(
        { userId },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "5m" }
      );
      return { accessToken };
    } catch (error) {
      return null;
    }
  }

  async findToken(refreshToken, deviceId) {
    return await tokenModel.findOne({ refreshToken, device: deviceId });
  }

  async deleteToken(refreshToken) {
    return await tokenModel.findOneAndDelete({ refreshToken });
  }

  async saveToken(deviceId, refreshToken) {
    const existToken = await tokenModel.findOne({ device: deviceId });

    if (existToken) {
      existToken.refreshToken = refreshToken;
      return existToken.save();
    }
    const token = await tokenModel.create({ device: deviceId, refreshToken });
    return token;
  }

  validateRefreshToken(refreshToken) {
    try {
      const payload = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      return payload;
    } catch (error) {
      return null;
    }
  }

  validateAccessToken(token) {
    try {
      return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (error) {
      return null;
    }
  }
}

module.exports = new TokenService();
