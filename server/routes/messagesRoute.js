const { addMessage, getallMessage } = require("../controllers/messagesController");
const router = require("express").Router();

router.post("/addmsg", addMessage);
router.post("/getmsg", getallMessage);

module.exports = router;
