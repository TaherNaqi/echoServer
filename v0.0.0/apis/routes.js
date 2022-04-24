const express = require("express");
const router = express.Router();
const { echoBack } = require("./controller");
router.get("/v2/dao/healthcheck/echo?", echoBack);
module.exports = router;
