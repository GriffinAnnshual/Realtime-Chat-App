const express = require("express");
const http = require("http")
const {Server} = require("socket.io")
const path = require("path")
const app = express();

app.use(express.static(path.resolve("./public")))

app.get("/",(req,res)=>{
    res.sendFile("index.html")
})

const server = http.createServer(app)

const io = new Server(server)

io.on("connection", (socket)=>{
    socket.on("message", (msg)=>{
        io.emit("new-message", msg)
    })
})

server.listen(3000,()=>{
    console.log("The HTTP server started at port 3000")
})
