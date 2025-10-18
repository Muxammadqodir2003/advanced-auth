const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.get("/user/devices", authMiddleware, userController.getDevices);
router.get("/user/messages", authMiddleware, userController.getMessages);

router.post("/user/forgot-password", userController.forgotPassword);

router.put(
  "/user/enable-two-auth",
  authMiddleware,
  userController.enableTwoFactorAuth
);
router.put(
  "/user/disable-two-auth",
  authMiddleware,
  userController.disableTwoAuth
);
router.put("/user/change-pass", authMiddleware, userController.changePass);
router.put("/user/recovery-account/:token", userController.recoveryAccount);

module.exports = router;
