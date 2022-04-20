const http = require("http");
const express = require("express");
const app = express();
const swaggerUi = require("swagger-ui-express");
const url = require("url");
const port = 3000;
const host = "localhost";
const winston = require("winston");

const server = http.createServer(function (req, res) {
  const parsedURL = url.parse(req.url, true);
  if (
    parsedURL.pathname == "/v2/dao/healthcheck/echo" &&
    parsedURL.query.message
  ) {
    res.statusCode = 200; //Successfull
    res.end(parsedURL.query.message);
  } else {
    res.statusCode = 404; //Failed - Invalid Request
    res.end("Request not valid");
  }
});

// Swagger initialization:

// const swaggerUi = require("swagger-ui-express"),
swaggerDocument = require("./swagger.json");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(8000, () => console.log("Swagger is running on port 8000")); // Swagger Port
server.listen(port, host, function () {
  console.log("Echo server is running on port 3000");
}); //Echo server
