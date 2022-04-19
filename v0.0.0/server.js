const http = require("http");
const url = require("url");
const port = 3000;
const host = "localhost";
const server = http.createServer(function (req, res) {
  const parsedURL = url.parse(req.url, true);
  if (parsedURL.pathname == "/healthcheck/echo" && parsedURL.query.message) {
    res.end(parsedURL.query.message);
  } else {
    res.end("Request not valid");
  }
});

server.listen(port, host, function () {
  console.log("Echo server is running on port 3000");
});
