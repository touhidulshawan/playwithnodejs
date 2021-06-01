import express from "express";
import { User } from "./models/User";
import { Task } from "./models/Task";
import userRouter from "./routers/userRouter";
import taskRouter from "./routers/taskRouter";
require("./db/mongoose");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log(`app is running on localhost:${port}`);
});
