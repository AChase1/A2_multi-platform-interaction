// --- SERVER & APP CONFIGURATION --- ///

const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

const listenPort = 8080;
const rootFile = "index.html";
const staticPath = __dirname + "/public";

app.get('/', function (req, res) {
    res.sendFile(rootFile, { root: staticPath });
});

server.listen(listenPort);
app.use(express.static(staticPath));
console.log("Listening on port: " + listenPort);