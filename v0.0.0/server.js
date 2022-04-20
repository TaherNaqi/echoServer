const http = require("http");
const express = require("express");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const url = require("url");
const port = 3000;
const host = "localhost";
const winston = require("winston");
const moment = require("moment");
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Echo Api",
      description: "Echoing back to the server",
      contact: { name: "Taher" },
    },
    servers: ["http://localhost:8000"],
  },
  apis: ["server.js"],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
/**
 * @swagger
 * v2/dao/healthcheck/echo?message=hello:
 * get:
 *    description: Use to get echo back from server
 *    responses:
 *      '200':
 *        description: a successful echo back
 */
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});
const server = http.createServer(function (req, res) {
  const parsedURL = url.parse(req.url, true);
  const timeStamps = moment().format("HH:mm:ss");
  if (
    parsedURL.pathname == "/v2/dao/healthcheck/echo" &&
    parsedURL.query.message
  ) {
    res.statusCode = 200; //Successfull
    logger.log({
      level: "info",
      message: `Request on ${req.url} is successful`,
      time: timeStamps,
    });
    res.end(parsedURL.query.message);
  } else {
    res.statusCode = 404; //Failed - Invalid Request
    logger.log({
      level: "error",
      message: `Request on ${req.originalUrl} failed`,
      time: timeStamps,
    });
    res.end("Request not valid");
  }
});
app.listen(8000, () => console.log("Swagger is running on port 8000")); // Swagger Port
server.listen(port, host, function () {
  console.log("Echo server is running on port 3000");
}); //Echo server
