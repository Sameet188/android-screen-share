const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

app.get("/view/:token", (req, res) => {
  res.sendFile(__dirname + "/public/view.html");
});

app.get("/share/:token", (req, res) => {
  res.sendFile(__dirname + "/public/share.html");
});

io.on("connection", (socket) => {
  socket.on("screen-data", (data) => {
    io.emit("screen-data", data);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log("Server running on port " + PORT));
