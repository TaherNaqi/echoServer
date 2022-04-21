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
 *              required: true
 *              type: string
 *              description: Message to be echoed.
 *           responses:
 *             200:
 *               description: OK
 */

//Initializing logger

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});
app.get("/v2/dao/healthcheck/echo?", function (req, res) {
  try {
    const timeStamps = moment().format("HH:mm:ss");
    if (url.parse(req.url, true).query)
      logger.log({
        level: "info",
        message: `Request on ${req.url} is successful`,
        time: timeStamps,
      });
    res.status(200).json(url.parse(req.url, true).query);
  } catch (error) {
    res.status(404).end("Invalid request");
  }
});

// const server = http.createServer(function (req, res) {
//   const parsedURL = url.parse(req.url, true);
//   const timeStamps = moment().format("HH:mm:ss");
//   if (
//     parsedURL.pathname == "/v2/dao/healthcheck/echo" &&
//     parsedURL.query.message
//   ) {
//     res.statusCode = 200; //Successfull
//     res.setHeader("Content-Type", "application/json");
//     res.end(JSON.stringify({ message: parsedURL.query.message })) &&
//       logger.log({
//         level: "info",
//         message: `Request on ${req.url} is successful`,
//         time: timeStamps,
//       });
//   } else {
//     res.statusCode = 404; //Failed - Invalid Request
//     res.end("Request not valid") &&
//       logger.log({
//         level: "error",
//         message: `Request on ${req.originalUrl} failed`,
//         time: timeStamps,
//       });
//   }
// });
app.listen(8000, () => console.log("Swagger is running on port 8000")); // Swagger Port

// server.listen(port, host, () => {
//   console.log("Echo server is running on port 3000");
// }); //Echo server
