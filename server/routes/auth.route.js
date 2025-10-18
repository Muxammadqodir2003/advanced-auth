const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.get("/auth/refresh", authController.refresh);

router.post("/auth/login", authController.login);
router.post("/auth/verify", authController.verify);
router.post("/auth/verify-two-auth", authController.verify2FA);

router.delete("/auth/session/:id", authMiddleware, authController.logoutOne);
router.delete("/auth/sessions", authMiddleware, authController.logoutAll);
router.delete("/auth/logout", authController.logout);

module.exports = router;
