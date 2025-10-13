const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.get("/auth/refresh", authMiddleware, authController.refresh);

router.post("/auth/login", authController.login);
router.post("/auth/verify", authController.verify);
router.post("/auth/forgot-password", authController.forgotPassword);

router.put("/user/enable-two-auth", authController.enableTwoFactorAuth);

router.delete("/auth/session/:id", authMiddleware, authController.logoutOne);
router.delete("/auth/sessions", authMiddleware, authController.logoutAll);

module.exports = router;
