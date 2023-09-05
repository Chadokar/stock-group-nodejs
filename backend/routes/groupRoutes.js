const { Router } = require("express");
const groupController = require("../controllers/groupController");

const router = Router();

router.post("/group", groupController.group_post);
router.put("/add-member/:groupId", groupController.add_member);
router.get("/group/:groupId", groupController.group_get);
router.post("/message", groupController.message_post);

module.exports = router;
