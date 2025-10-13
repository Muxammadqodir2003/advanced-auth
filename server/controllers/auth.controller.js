const userModel = require("../models/user.model");
const authService = require("../services/auth.service");
const mailService = require("../services/mail.service");
const { generateToken } = require("../services/token.service");

class AuthController {
  async login(req, res, next) {
    try {
      const { email } = req.body;
      const data = await authService.login(email);
      return res.json({ email: data.email });
    } catch (error) {
      next(error);
    }
  }

  async verify(req, res, next) {
    try {
      const { email, otp } = req.body;
      const data = await authService.verify(email, otp, req);
      res.cookie("refreshToken", data.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
      });
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const data = await authService.refresh(refreshToken);
      res.cookie("refreshToken", data.refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async enableTwoFactorAuth(req, res, next) {
    try {
      const { password } = req.body;
      const userId = "68ecec4ec4d0545e77454392";
      await authService.addTwoFactorAuth(userId, password);
      return res.json({ message: "2FA enabled" });
    } catch (error) {
      next(error);
    }
  }

  async logoutOne(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user._id;
      await authService.logoutOne(id, userId);
      return res.json({ message: "Logged out device" });
    } catch (error) {
      next(error);
    }
  }

  async logoutAll(req, res, next) {
    try {
      const userId = req.user._id;
      await authService.logoutAll(userId);
      res.clearCookie("refreshToken");
      return res.json({ message: "All device logged out" });
    } catch (error) {
      next(error);
    }
  }

  async forgotPassword(req, res, next) {
    try {
      const { email } = req.body;
      await authService.forgotPassword(email);
      return res.json({ message: "Link send" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
