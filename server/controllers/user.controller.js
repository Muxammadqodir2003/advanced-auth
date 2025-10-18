const userService = require("../services/user.service");

class UserController {
  async getDevices(req, res, next) {
    try {
      const userId = req.user._id;
      const sessions = await userService.getDevices(userId);
      return res.json(sessions);
    } catch (error) {
      next(error);
    }
  }

  async enableTwoFactorAuth(req, res, next) {
    try {
      const { password } = req.body;
      const userId = req.user._id;
      await userService.addTwoFactorAuth(userId, password);
      return res.json({ message: "2FA enabled" });
    } catch (error) {
      next(error);
    }
  }

  async disableTwoAuth(req, res, next) {
    try {
      const { password } = req.body;
      const userId = req.user._id;
      await userService.disableTwoAuth(userId, password);
      return res.json({ message: "2FA disabled" });
    } catch (error) {
      next(error);
    }
  }

  async changePass(req, res, next) {
    try {
      const { oldPassword, password } = req.body;
      const userId = req.user._id;
      await userService.changePass(userId, oldPassword, password);
      return res.json({ message: "Change 2FA password" });
    } catch (error) {
      next(error);
    }
  }

  async getMessages(req, res, next) {
    try {
      const userId = req.user._id;
      const messages = await userService.getMessages(userId);
      return res.json({ messages });
    } catch (error) {
      next(error);
    }
  }

  async forgotPassword(req, res, next) {
    try {
      const { email } = req.body;
      await userService.forgotPassword(email);
      return res.json({ message: "Recovery link send to your email" });
    } catch (error) {
      next(error);
    }
  }

  async recoveryAccount(req, res, next) {
    try {
      const { token } = req.params;
      const { password } = req.body;
      await userService.recoveryAccount(token, password);
      return res.json({ message: "Account recovered please login again" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
