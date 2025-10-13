const BaseError = require("../errors/base.error");
const userModel = require("../models/user.model");
const tokenService = require("../services/token.service");

module.exports = async function (req, res, next) {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) throw BaseError.Unauthorized();

    const parts = authorization.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer")
      throw BaseError.Unauthorized();

    const token = parts[1];

    const { userId } = tokenService.validateAccessToken(token);
    if (!userId) throw BaseError.Unauthorized();

    const user = await userModel.findById(userId);
    if (!user) throw BaseError.Unauthorized();

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};
