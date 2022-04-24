const moment = require("moment");
const url = require("url");
const winston = require("winston");

// Initializing logger

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});
exports.echoBack = (req, res) => {
  const timeStamps = moment().format("HH:mm:ss");
  if (url.parse(req.url, true).query.message) {
    logger.log({
      level: "info",
      message: `Request on ${req.url} is successful`,
      time: timeStamps,
    });
    res.status(200).json(url.parse(req.url, true).query);
  } else {
    logger.log({
      level: "error",
      message: `Request on ${req.url} failed`,
      time: timeStamps,
    });
    res.status(404).end("Invalid request");
  }
};
