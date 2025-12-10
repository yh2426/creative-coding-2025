let express = require("express");
let app = express();

app.use(express.static("public"));

let server = app.listen(3000);
console.log("my socket server is running");

// 引入 socket.io
let socket = require("socket.io");

// 把 socket.io 绑到 server 上
let io = socket(server);

// 监听客户端连接
io.on("connection", newConnection);

function newConnection(socket) {
    console.log("a user connected", socket.id);
}
