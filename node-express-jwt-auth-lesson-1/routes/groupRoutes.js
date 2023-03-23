const { Router } = require("express");
const groupController = require("../controllers/groupController");
const { checkUser } = require("../middleware/authMiddleware");

const router = Router();

router.post("/group", groupController.group_post);
router.get("/group/:groupId", checkUser, groupController.group_get);
router.post("/message", groupController.message_post);

module.exports = router;
