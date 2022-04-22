const express = require("express");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const url = require("url");
const winston = require("winston");
const moment = require("moment");
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Echo Api",
      description: "Echoing back to the server",
      contact: { name: "Developer" },

      servers: ["http://localhost:8000"],
    },
  },
  apis: ["server.js"],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
/**
 * @swagger
 *    paths:
 *      /v2/dao/healthcheck/echo?:
 *        get:
 *           parameters:
 *            - in: query
 *              name: message   # Note the name is the same as in the path
 *              required: false
 *              type: string
 *              description: Message to be echoed.
 *           responses:
 *             200:
 *               description: Successfully echoed back message
 *             404:
 *               description: Invalid request
 */

//Initializing logger

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});
app.get("/v2/dao/healthcheck/echo?", function (req, res) {
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
});
app.listen(8000, () => console.log("Swagger is running on port 8000")); // Swagger Port
