const { Router } = require("express");
const authController = require("../controllers/authController");
const { verifyToken } = require("../middleware/authMiddleware");

const router = Router();

router.post("/signup", authController.signup_post);
router.get("/login", authController.login_get);
router.post("/login", authController.login_post);
router.get("/logout", authController.logout_get);
router.put("/updates", verifyToken, authController.update_user_put);
router.get("/profile", verifyToken, authController.get_details);
router.get("/data", authController.get_data);

module.exports = router;
