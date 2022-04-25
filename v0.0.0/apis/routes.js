const express = require("express");
const router = express.Router();
const { echoBack } = require("./controller");
router.get("", echoBack);
module.exports = router;
