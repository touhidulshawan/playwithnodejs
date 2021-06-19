import path from "path";
import expres from "express";
import routes from "./routes/routes";
import http from "http";
import { Server, Socket } from "socket.io";
import config from "./config/config";
import log from "./logger";

const hostname = config.server.hostname;
const port = config.server.port;

const app = expres();
const server = http.createServer(app);
const io = new Server(server);

const publicDirectoryPath = path.join(__dirname, "../public");

app.use(expres.json());
app.use(expres.urlencoded({ extended: false }));
app.use(expres.static(publicDirectoryPath));

routes(app);

let welcomeMessage = "Welcome! to the chat app";
io.on("connection", (socket: Socket) => {
  log.info("New websocket connection");
  socket.emit("message", welcomeMessage);
  socket.broadcast.emit("message", "A new has joined");
  socket.on("sendMessage", (msg) => {
    io.emit("message", msg);
  });
  // send message when a user left
  socket.on("disconnect", () => {
    io.emit("message", "A user has left the room!");
  });
});

server.listen(port, () => {
  log.info(`Server is running on ${hostname}:${port}`);
});
