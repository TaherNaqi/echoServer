const express = require("express");
const app = express();
const echoRoute = require("./apis/routes");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
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
app.use("/v2/dao/healthcheck/echo?", echoRoute);
app.listen(8000, () => console.log("Swagger is running on port 8000")); // Swagger Port
