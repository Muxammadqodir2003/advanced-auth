const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const deviceModel = require("../models/device.model");

class TokenService {
  generateToken(userId) {
    const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(
      { userId },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "30d" }
    );

    return { accessToken, refreshToken };
  }

  validateRefreshToken(refreshToken) {
    try {
      return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
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

  async findToken(refreshToken) {
    return await deviceModel.findOne({ refreshToken });
  }

  async saveToken(userId, refreshToken) {
    const session = await deviceModel.findOne({ user: userId });
    if (session) {
      session.refreshToken = refreshToken;
      return session.save();
    }
    return session;
  }
}

module.exports = new TokenService();
